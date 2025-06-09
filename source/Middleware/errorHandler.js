export const errorrHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // If there are validation details, only return them
  if (err.details) {
    return res.status(err.status || 422).json(err.details);
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
};