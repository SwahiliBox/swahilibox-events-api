import CustomError from '../helpers/customError'

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({ message: err.message })
}

export default errorHandler
