/**
 * Login user post api
 */
const dotenv = require("dotenv");
dotenv.config({
  path: `.env`
});
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { LOGIN_FAILED } = require("../../common/errorMessages");
const { LOGIN_SUCCESS } = require("../../common/sucessMessages");
const { loginValidationSchema } = require("../apiValidation/validation");

const loginUser = async (req, res, next) => {
  try {
    //  1.  Validate login api's inputs
    await validate(req.body);
    //  2.  authanticate login using passport
    passport.authenticate("local", function(err, user) {
      if (user) {
        req.logIn(user[0], err => {
          if (err) {
            return next(LOGIN_FAILED);
          }
          console.log(user[0].id);
          console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
          const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET);

          res.send({ message: LOGIN_SUCCESS, token: token });
        });
      } else {
        return next(err);
      }
    })(req, res, next);
  } catch (error) {
    //  Go to error handler
    return next(error);
  }
};

//  validate body parameters
const validate = async data => {
  const validateData = Joi.validate(data, loginValidationSchema);

  if (validateData.error !== null) {
    throw new Error(validateData.error.message);
  }
};

exports.post = loginUser;
