const { validationResult } = require("express-validator");

function validateRequest(req, _res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const formatted = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));

  return next({
    statusCode: 422,
    message: "Validation failed.",
    details: formatted,
    isOperational: true,
  });
}

module.exports = validateRequest;
