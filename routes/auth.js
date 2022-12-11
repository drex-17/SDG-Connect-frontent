const axios = require('axios');
const logger = require('../utils/logger');
const { Router } = require('express');
const flash = require('connect-flash');
const passport = require('passport');// const LocalStrategy = require('passport-local');
const CryptoJS = require('crypto-js');
const sendVerificationCode = require('../utils/send_sms')
const { addUser, getUser, addToken, getToken, getUserByMail } = require('../db_api');


// axios.defaults.baseURL = 'https://exceptionally-mint-toast-world-dev.wayscript.cloud/api';

const router = Router('');

// GET /index
router.get('/', async (req, res, next) => {
  logger.info('index' + req.url)
  res.render('index', {user: ''})
})

/* GET /login
 *
 */
router.get('/login', async (req, res, next) => {
  logger.info('l-url' + req.url);
  res.render('sign_in'/*, { csrfToken: req.csrfToken() }*/);
});

/* GET /register
*/
router.get('/register-user', function (req, res, next) {
  res.render('register_users');
});

/* POST /login/
 *
 * This route authenticates the user by verifying a username and password.
 */
router.post('/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

/* POST /signup
 *
 * This route creates a new user account.
 *
 * A desired username and password are submitted to this route via an HTML form,
 * which was rendered by the `GET /signup` route.  The password is hashed and
 * then a new user record is inserted into the database.  If the record is
 * successfully created, the user is logged in.
 */
router.post('/register_user', async (req, res, next) => {
  // logger.info(req.body.email);
  console.log(req.url);
  // console.log(req.body.email);
  logger.info(`email: ${JSON.stringify(req.body)}`);
  const { password, email, name, token, job_title, phone } = req.body
  logger.info(`req ${52}`);
  let hash = CryptoJS.SHA256(password);
  let hashStr = hash.toString(CryptoJS.enc.Base64);
  try {
    // logger.info('req', JSON.stringify(req));
    let data = JSON.stringify({
      name, password, email, phone, job_title 
    });
    const response = await addUser(data);
    logger.info(response);
    let user = {
      id: response.id,
      email: response
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
 * GET /sgin-in company
 * 
 */

router.get('/sign-company', async (req, res, next) => {
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
router.get('/forgot', (req, res, next) => {
  res.render('forgotPassword');
});

/**
 * POST /reset
 */
router.post('/forgot', async (req, res, next) => {
  let data = JSON.stringify({
    email: req.body.email
  });
  try {
    const user = await getUserByMail(data);
  
    if(!user) {
      req.flash('error', 'No account with that email address exists.');
      return res.redirect('/forgot');
    }
    const code = (Math.random() + 1).toString().substring(12);
    let response = await sendVerificationCode(user.phone, code);
    if(response.code === 'ok') {
      req.flash('info', `An SMS has been sent to  this number ${user.phone} with verification code.`);
    }
    const data = JSON.stringify({
      email: user.email,
      token
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
router.post('reset_password', (req, res, next) => {

})


module.exports = router;