const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "Username already taken."],
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            unique: [true, "User with this email already exists."],
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;