const errorHandler = (error, req, res, next) => {
  console.error('Error:', error);

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  }

  if (error.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value';
    const field = Object.keys(error.keyValue)[0];
    return res.status(statusCode).json({
      success: false,
      message: `${field} already exists`
    });
  }

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
};

module.exports = errorHandler;
