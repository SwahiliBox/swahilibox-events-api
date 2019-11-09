import Schema from 'validate';

const authData = {
  email: {
    type: String,
    required: true,
    // eslint-disable-next-line no-useless-escape
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    length: { min: 6 },
  },
};

const validateAuthData = (req, res, next) => {
  const userData = new Schema(authData);
  const errors = userData.validate(req.body);
  if (errors.length) {
    return res.status(400).json({ message: errors[0].message });
  }
  return next();
};

export default validateAuthData;
