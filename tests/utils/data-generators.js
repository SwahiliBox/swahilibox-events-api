import faker from 'faker'

const createUserObject = (overrides = {}) => {
  const user = Object.assign({}, overrides)
  return Object.assign(
    {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(),
    },
    user,
  )
}

const generators = {
  createUserObject,
}

export default generators
