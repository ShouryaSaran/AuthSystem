const jwt = require("jsonwebtoken");
const blacklist = require("../Models/blacklist.model");
const asyncHandler = require("../Utils/asyncHandler");
const AppError = require("../Utils/appError");

function extractToken(req) {
    if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    return null;
}

const authUser = asyncHandler(async (req, _res, next) => {
    const token = extractToken(req);

    if (!token) {
        return next(new AppError("Authentication token not provided.", 401));
    }

    const blacklistedToken = await blacklist.findOne({ token });
    if (blacklistedToken) {
        return next(new AppError("Session expired. Please login again.", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (_err) {
        return next(new AppError("Invalid token.", 401));
    }
});

module.exports = { authUser };