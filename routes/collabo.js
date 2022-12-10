const logger = require('../utils/logger');
const { Router } = require('express');
const { addColloba } = require('../db_api');

const router = Router();
/**  POST /job
 *  fields: 
 * title, job_type, industry, EDUCATION, location,
 * working_hrs, "min_salary","max_salary"
 *  
 */

/**
 * GET /donation -- 
 * when user hits this endpoint render collab opage
 */
router.get('/collabo', async (req, res, next) => {
  const collabos = await getC
  res.render('collaboarte_homepage')
})

router.post('/add_collabo', async (req, res, next) => {
  let data = req.body
  let response = await addJob()
});


router.post('/add_donation', (req, res, next) => {

})