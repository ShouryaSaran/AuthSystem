const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");
const tokenBlackListModel = require("../Models/blacklist.model");
const asyncHandler = require("../Utils/asyncHandler");
const AppError = require("../Utils/appError");

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000,
    };
}

function signToken(user) {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
}

const registerUserController = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        return next(new AppError("Account already exists with this username/email.", 409));
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await userModel.create({
        username,
        email,
        password: hash,
    });

    const token = signToken(user);
    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
        message: "User registered successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
});

const loginUserController = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new AppError("Invalid email or password.", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new AppError("Invalid email or password.", 401));
    }

    const token = signToken(user);
    res.cookie("token", token, getCookieOptions());

    res.status(200).json({
        message: "User logged in successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
});

const logoutUserController = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        await tokenBlackListModel.create({ token });
    }

    res.clearCookie("token", getCookieOptions());

    res.status(200).json({
        message: "User logged out successfully.",
    });
});

const getMeController = asyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.user.id).select("_id username email role");

    if (!user) {
        return next(new AppError("User not found.", 404));
    }

    res.status(200).json({
        message: "User details fetched successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
    });
});

const getAllUsersController = asyncHandler(async (_req, res) => {
    const users = await userModel.find().select("_id username email role createdAt").sort({ createdAt: -1 });

    res.status(200).json({
        message: "Users fetched successfully.",
        users,
    });
});

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    getAllUsersController,
};