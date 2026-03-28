const express = require("express");
const taskController = require("../../Controller/taskController");
const { authUser } = require("../../Middleware/authMiddleware");
const validateRequest = require("../../Middleware/validateRequest");
const { createTaskValidator, taskIdValidator, updateTaskValidator } = require("../../Validators/taskValidators");

const taskRouter = express.Router();

taskRouter.use(authUser);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 */
taskRouter.post("/", createTaskValidator, validateRequest, taskController.createTaskController);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: List tasks
 *     tags: [Tasks]
 */
taskRouter.get("/", taskController.getTasksController);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 */
taskRouter.get("/:id", taskIdValidator, validateRequest, taskController.getTaskByIdController);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: Update task
 *     tags: [Tasks]
 */
taskRouter.patch("/:id", updateTaskValidator, validateRequest, taskController.updateTaskController);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 */
taskRouter.delete("/:id", taskIdValidator, validateRequest, taskController.deleteTaskController);

module.exports = taskRouter;
