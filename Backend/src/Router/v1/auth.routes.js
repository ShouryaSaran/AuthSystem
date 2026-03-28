const express = require("express");
const authController = require("../../Controller/authController");
const { authUser } = require("../../Middleware/authMiddleware");
const { authorizeRoles } = require("../../Middleware/roleMiddleware");
const validateRequest = require("../../Middleware/validateRequest");
const { registerValidator, loginValidator } = require("../../Validators/authValidators");

const authRouter = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
authRouter.post("/register", registerValidator, validateRequest, authController.registerUserController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
authRouter.post("/login", loginValidator, validateRequest, authController.loginUserController);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 */
authRouter.post("/logout", authUser, authController.logoutUserController);

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 */
authRouter.get("/me", authUser, authController.getMeController);

/**
 * @swagger
 * /api/v1/auth/admin/users:
 *   get:
 *     summary: Admin - list all users
 *     tags: [Auth]
 */
authRouter.get("/admin/users", authUser, authorizeRoles("admin"), authController.getAllUsersController);

module.exports = authRouter;
