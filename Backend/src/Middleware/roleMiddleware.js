const AppError = require("../Utils/appError");

function authorizeRoles(...allowedRoles) {
  return (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to access this resource.", 403));
    }

    next();
  };
}

module.exports = { authorizeRoles };
