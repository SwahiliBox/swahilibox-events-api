import passport from 'passport'
import db from '../database/models'
import EncryptData from '../lib/helpers/encrypt'
import CustomError from '../lib/helpers/customError'

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { Strategy: LocalStrategy } = require('passport-local')
const { secretKey, jwtExpiration } = require('./config')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await db.User.findOne({ where: { email } })

        if (!user) throw new CustomError(400, 'Wrong email or password')
        const passwordMatch = await EncryptData.compareHash(
          password,
          user.password,
        )
        if (!passwordMatch) {
          throw new CustomError(400, 'Wrong email or password')
        }
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    },
  ),
)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
      jsonWebTokenOptions: { maxAge: jwtExpiration },
    },
    (jwtPayload, done) => done(null, jwtPayload),
  ),
)

const localAuthentication = passport.authenticate('local', {
  session: false,
})

const jwtAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) throw new CustomError(401, 'please login to continue')
    req.user = user
    next()
  })(req, res, next)
}
export { localAuthentication, jwtAuthentication }
