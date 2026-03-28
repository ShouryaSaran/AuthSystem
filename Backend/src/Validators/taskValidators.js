const { body, param } = require("express-validator");

const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required.")
    .isLength({ max: 120 })
    .withMessage("Title must be at most 120 characters."),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters."),
  body("status")
    .optional()
    .isIn(["todo", "in-progress", "done"])
    .withMessage("Status must be todo, in-progress, or done."),
  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high."),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Due date must be a valid ISO date."),
];

const taskIdValidator = [param("id").isMongoId().withMessage("Task id is invalid.")];

const updateTaskValidator = [
  ...taskIdValidator,
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty.").isLength({ max: 120 }).withMessage("Title must be at most 120 characters."),
  body("description").optional().trim().isLength({ max: 500 }).withMessage("Description must be at most 500 characters."),
  body("status").optional().isIn(["todo", "in-progress", "done"]).withMessage("Status must be todo, in-progress, or done."),
  body("priority").optional().isIn(["low", "medium", "high"]).withMessage("Priority must be low, medium, or high."),
  body("dueDate").optional({ values: "falsy" }).isISO8601().withMessage("Due date must be a valid ISO date."),
];

module.exports = { createTaskValidator, taskIdValidator, updateTaskValidator };
