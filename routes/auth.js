const axios = require('axios');
const logger = require('../utils/logger');
const { Router } = require('express');
const flash = require('connect-flash');
const passport = require('passport');// const LocalStrategy = require('passport-local');
const CryptoJS = require('crypto-js');
const sendVerificationCode = require('../utils/send_sms')
const { addUser, getUser, addToken, getToken, getUserByPhone } = require('../db_api');


// axios.defaults.baseURL = 'https://exceptionally-mint-toast-world-dev.wayscript.cloud/api';

const router = Router();

/* GET /login
 *
 */
router.get('/login', async (req, res) => {
  logger.info('l-url' + req.url);
  logger.info('session', req.session.passport);
  res.render('sign_in');/*, { csrfToken: req.csrfToken() });*/
});

/* POST /login/
 *
 * This route authenticates the user by verifying a username and password.
 */
router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/auth/login',
  failureMessage: true
}));

/* GET /register
*/
router.get('/signup-user', function (req, res) {
  res.render('register_users');
});


/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post('/register', async (req, res, next) => {
  logger.info('email', req.body.email);
  logger.info(req.url);
  // console.log(req.body.email);
  logger.info(`email: ${JSON.stringify(req.body)}`);
  const { password, email, name, phone } = req.body;

  logger.info(`req.body: ${password}`);
  let hash = CryptoJS.SHA256(password);
  logger.info(`hash ${hash}`);
  let hashStr = hash.toString(CryptoJS.enc.Base64);
  logger.info(`hashpwd:  ${hashStr}`);
  try {
    // logger.info('req', JSON.stringify(req));
    let data = JSON.stringify({
      name, email, phone, password: hashStr, token: ""
    });
    logger.info(data)
    const response = await addUser(data);
    logger.info(response);
    let user = {
      id: response.id,
      email: response
    };
    req.login(user, (error) => {
      if (error) {
        logger.error(error);
        return next(error);
      }
      res.redirect('/');
    });
  } catch (error) {
    logger.error(error);
    return next(error);
  }
});

/**
 * GET /sgin-in company
 * 
 */

router.get('/sign-company', async (req, res) => {
  res.render('render')
})

/**
 * POST /register_company
 * job_id":2,
    "company": "employees_no": "address", "phone", "industry"
    "website_url"
    "password"
    "email"
 */router.post('/register_company', async (req, res, next) => {
  // logger.info(req.body.email);
  console.log(req.url);

  logger.info(`email: ${JSON.stringify(req.body)}`);
  let hash = CryptoJS.SHA256(req.body.password);
  let hashStr = hash.toString(CryptoJS.enc.Base64);
  try {
    // logger.info('req', JSON.stringify(req));
    let data = JSON.stringify({ ...req.body, password: hashStr });
    const response = await addUser(data);
    logger.info(response);
    let user = {
      id: response.id,
      email: response.email
    };
    req.login(user, (err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  } catch (error) {
    console.log(error.status);
    return next(error);
  }
});

/**
 *  GET /reset -- reset password
 */
router.get('/forgot', (req, res) => {
  res.render('reset_password');
});

/**
 * POST /reset
 */
router.post('/reset', async (req, res) => {
  const data = JSON.stringify({
    phone: req.body.phone
  });
  logger.info('data:', req);
  try {
    const user = await getUserByPhone(data);

    // if(!user) {

    // }
    req.flash('info', 'An SMS verification code will be sent to this phone number if it matches with an account.');

    const code = (Math.random() + 1).toString().substring(12);
    let response = await sendVerificationCode(user.phone, code);

    if (response.code === 'ok') {
      req.flash('info', `An SMS verification code will be sent to this number ${user.phone} if it matches an account.`);
    }
    const data = JSON.stringify({
      email: user.email,
      code
    });
    response = await addToken(data);
    if (response.code == "200") {
      return res.render('reset_password');
    }
    logger.info()
  }
  catch (error) {
    logger.error(error.message);
    req.flash('info', 'Try Again');
    return res.redirect('/forget');
  }

});


/**
 * POST / reset_password
 * page to enter new password to reset
 */
router.post('reset_password', (req, res) => {

})


module.exports = router;