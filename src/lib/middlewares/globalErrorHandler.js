import CustomError from '../util/customError';

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  const message = err.message || err.detail || err;
  return res.status(500).json({ message });
};

export default errorHandler;
