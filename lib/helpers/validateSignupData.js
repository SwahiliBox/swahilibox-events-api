import Schema from 'validate'

const validateSignupData = data => {
  const signUpData = {
    firstName: {
      type: String,
      required: true,
      length: { min: 3, max: 55 },
      message: 'please povide a valid first name',
    },
    lastName: {
      type: String,
      required: true,
      length: { min: 3, max: 55 },
      message: 'please povide a valid last name',
    },
    email: {
      type: String,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: 'please provide a valid email',
    },
    password: {
      type: String,
      required: true,
      length: { min: 6 },
    },
  }
  const userData = new Schema(signUpData)
  return userData.validate(data)
}

export default validateSignupData
