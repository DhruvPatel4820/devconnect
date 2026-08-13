const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  console.log(err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,

      message: "Image size should be less than 5MB",
    });
  }

  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      success: false,

      message: err.message,
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
