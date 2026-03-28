const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const authRouter = require("./Router/v1/auth.routes");
const taskRouter = require("./Router/v1/task.routes");
const swaggerSpec = require("./Docs/swagger");
const { notFoundHandler, errorHandler } = require("./Middleware/errorMiddleware");

const app = express();

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "https://auth-system-ten-ashen.vercel.app",
];

const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ message: "Server healthy" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;

