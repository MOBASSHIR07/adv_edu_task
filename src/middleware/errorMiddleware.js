const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }


  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

 
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate entry: That ${duplicateField} is already registered.`;
  }

  if (err.name === "BSONError" || message.includes("ObjectId")) {
    statusCode = 400;
    message = "The provided ID format is invalid.";
  }

 
  if (err.name === "MongoNetworkError") {
    statusCode = 503;
    message = "Database is currently unreachable. Please try again later.";
  }
 
  if (err.message.includes("Illegal arguments")) {
  statusCode = 500;
  message = "Internal security error: password hashing failed from global.";
}

  // Final JSON Response
  res.status(statusCode).json({
    success: false,
    message,
   
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;