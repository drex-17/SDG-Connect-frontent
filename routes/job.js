const logger = require('../utils/logger');
const { Router } = require('express');
const { addJob, getJobs } = require('../db_api');

const router = Router();
router.get('/', async (req, res) => {
  let response;
  let data = JSON.stringify({
      "title": "",
      "job_type": "",
      "industry": "",
      "location": "",
      "working_hrs": "",
      "min_salary": 0,
      "max_salary": 0
  });
  
  try {
    res.render('jobs', {jobs: data})
    // response = await getJobs(data);
    // res.render('jobs', { jobs: response.data });
  } catch (error) {
    logger.error(error.message);
    req.flash('err_msg', error.message);
    res.send(error.message)
  }
});

router.get('/job/search', async (req, res) => {
  const jobs = await getJobs();
  res.render('jobs', { jobs: jobs });
});

router.get('/job/post', (req, res) => {
  res.render('companyJob');
})

/**  POST /job
 *  fields: 
 * title, job_type, industry, location,, job_role
 * working_hrs, "min_salary","max_salary", industry
 *  
 */
router.post('/job/post', async (req, res) => {
  logger.info(req.body)
  let data = JSON.stringify({ 
    ...req.body, 
    industry: 'Tech',
    max_salary: req.body.salary, 
    min_salary: req.body.salary });
  try {
    let response = await addJob(data);
    
  } catch (error) {
    logger.error(error.message);
    res.send(error)
  }
})

module.exports = router