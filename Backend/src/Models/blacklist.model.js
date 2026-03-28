const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required to be added in blacklist."],
            index: true,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
            index: { expires: 0 },
        },
    },
    {
        timestamps: true,
    }
);

const tokenBlackListSchema = mongoose.model("BlackListToken", blackListTokenSchema);

module.exports = tokenBlackListSchema;