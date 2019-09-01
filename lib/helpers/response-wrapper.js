class responseWrapper {
  static respond({ res, status }) {
    return function respondWithData(data) {
      return res.status(status).send({ data })
    }
  }
}

export default responseWrapper
