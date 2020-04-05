const dotenv = require("dotenv");
dotenv.config({
  path: `.env`
});
const passport = require("passport");
const crypto = require("crypto");
const localStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
const { findByUserEmail, getByIdUser } = require("../models/usemodel");
const { cryptoPassword } = require("../common/commonFunction");
const {
  PASSWORD_INVALID,
  EMAIL_INVALID,
  TOKEN_INVALID,
  LOGIN_AGAIN
} = require("../common/errorMessages");

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const userData = await getByIdUser(id);
  if (!userData.data) {
    done({ message: LOGIN_AGAIN }, false);
  } else {
    done(null, userData.data);
  }
});

passport.use(
  new localStrategy(
    { usernameField: "email", session: false },
    async (email, password, done) => {
      const userData = await findByUserEmail(email);
      // console.log(userData);

      if (userData.error == null && userData.data.length > 0) {
        const salt = userData.data[0].salt;
        const dbPassword = userData.data[0].password;
        const comparePassword = cryptoPassword(salt, password);

        if (comparePassword.cryptoPassword === dbPassword) {
          return done(false, userData.data);
        }

        return done({ message: PASSWORD_INVALID }, false);
      } else {
        return done({ message: EMAIL_INVALID }, false);
      }
    }
  )
);

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    const userData = await getByIdUser(jwt_payload.id);
    console.log(userData);
    if (userData.error == null && userData.data.length > 0) {
      return done(false, userData.data);
    } else {
      return done({ message: TOKEN_INVALID }, false);
    }
  })
);
