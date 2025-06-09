import { validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(err => ({
      field: err.path,
      msg: err.msg
    }));

    const error = new Error();
    error.status = 422;
    error.details = formattedErrors;
    return next(error);
  }
  next();
};