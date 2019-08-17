import jwt from 'jsonwebtoken'

const createToken = (payload, secretKey, expiresIn) =>
  jwt.sign(payload, secretKey, expiresIn)

export default createToken
