const taskModel = require("../Models/task.model");
const AppError = require("../Utils/appError");
const asyncHandler = require("../Utils/asyncHandler");

const createTaskController = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await taskModel.create({
    title,
    description,
    status,
    priority,
    dueDate,
    owner: req.user.id,
  });

  res.status(201).json({
    message: "Task created successfully.",
    task,
  });
});

const getTasksController = asyncHandler(async (req, res) => {
  const query = req.user.role === "admin" ? {} : { owner: req.user.id };

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }

  const tasks = await taskModel.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    message: "Tasks fetched successfully.",
    count: tasks.length,
    tasks,
  });
});

const getTaskByIdController = asyncHandler(async (req, res, next) => {
  const task = await taskModel.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found.", 404));
  }

  if (req.user.role !== "admin" && String(task.owner) !== String(req.user.id)) {
    return next(new AppError("You do not have permission to access this task.", 403));
  }

  res.status(200).json({
    message: "Task fetched successfully.",
    task,
  });
});

const updateTaskController = asyncHandler(async (req, res, next) => {
  const task = await taskModel.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found.", 404));
  }

  if (req.user.role !== "admin" && String(task.owner) !== String(req.user.id)) {
    return next(new AppError("You do not have permission to update this task.", 403));
  }

  const updates = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  };

  Object.keys(updates).forEach((key) => {
    if (updates[key] === undefined) {
      delete updates[key];
    }
  });

  const updatedTask = await taskModel.findByIdAndUpdate(task.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Task updated successfully.",
    task: updatedTask,
  });
});

const deleteTaskController = asyncHandler(async (req, res, next) => {
  const task = await taskModel.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found.", 404));
  }

  if (req.user.role !== "admin" && String(task.owner) !== String(req.user.id)) {
    return next(new AppError("You do not have permission to delete this task.", 403));
  }

  await task.deleteOne();

  res.status(200).json({
    message: "Task deleted successfully.",
  });
});

module.exports = {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController,
};
