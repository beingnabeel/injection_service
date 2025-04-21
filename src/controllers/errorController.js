const AppError = require('../utils/appError');

// Handle Prisma database errors
const handlePrismaError = (err) => {
  if (err.code === 'P2002') {
    // Handle unique constraint violations
    return new AppError(
      `Duplicate field value: ${err.meta?.target?.join(', ')}. Please use another value!`,
      400,
    );
  }
  if (err.code === 'P2003') {
    // Handle foreign key constraint violations
    return new AppError(
      `Related record not found. ${err.meta?.field_name}`,
      400,
    );
  }
  if (err.code === 'P2025') {
    // Handle record not found
    return new AppError(`Record not found: ${err.meta?.cause}`, 404);
  }
  return new AppError(`Database error: ${err.message}`, 500);
};

// Handle JWT errors
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

// Send error response in development environment
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send error response in production environment
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// Global error handler middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Handle different types of errors
    if (err.name === 'PrismaClientKnownRequestError')
      error = handlePrismaError(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
