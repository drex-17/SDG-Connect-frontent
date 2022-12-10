const passport = require('passport');
const LocalStrategy = require('passport-local');
const MagicLinkStrategy = require('passport-magic-link').Strategy;
const logger = require('../utils/logger');
require('dotenv').config()
const { getUser } = require('../db_api');
/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
*/
const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};

const authenticateUser = (passport) => {
  /* Configure session management.
 *
 * When a login session is established, information about the user will be
 * stored in the session.  This information is supplied by the `serializeUser`
 * function, which is yielding the user ID and username.
 */
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  passport.use(new LocalStrategy.Strategy(
    customFields, 
    async (email, password, done) => {
    try {
      // Get user
      logger.info(`email: ${email}:${password}`);
      const user = await getUser({ email, password });

      if (user.id) {
        let authenticated_user = { id: user.id, email: user.email }
        done(null, user);
      } else {
        done(null, false, { message: "Invalid credentials" }); // status 401
      }
      // }
    } catch (error) { // user not found
      console.log(error);
      done(error, false, { message: "Email and passowrd does not match." });
    }
  }));
}


module.exports = { 
  authenticateUser,
};