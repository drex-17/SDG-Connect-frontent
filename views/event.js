const express = require('express');
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
const { getJobs, getDonations } = require('../db_api');
const logger = require('../utils/logger');

const ensureLoggedIn = ensureLogIn();
var router = express.Router();

router.get('/', async (req, res) => {
  res.send('Events');
})

 module.exports = router;