import Schema from 'validate'

const signUpData = {
  firstName: {
    type: String,
    required: true,
    length: { min: 3, max: 55 },
    message: 'please provide a valid first name',
  },
  lastName: {
    type: String,
    required: true,
    length: { min: 3, max: 55 },
    message: 'please provide a valid last name',
  },
  email: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'please provide a valid email',
  },
  password: {
    type: String,
    required: true,
    length: { min: 6 },
  },
}

const validateSignupData = (req, res, next) => {
  const userData = new Schema(signUpData)
  const errors = userData.validate(req.body)
  if (errors.length) {
    return res.status(400).json({ message: errors[0].message })
  }
  return next()
}

export default validateSignupData
