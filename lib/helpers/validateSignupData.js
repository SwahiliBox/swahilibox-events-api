import Schema from 'validate'

const validateSignupData = data => {
  const userData = new Schema({
    first_name: {
      type: String,
      required: true,
      length: { min: 3, max: 55 },
      message: 'please povide a valid first name',
    },
    last_name: {
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
    }
  })
  return userData.validate(data)
}

export default validateSignupData
