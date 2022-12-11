const logger = require('../utils/logger');
const { Router } = require('express');
const { addJob, getJobs } = require('../db_api');

const router = Router();
router.get('/jobs', async (req, res) => {
  const jobs = await getJobs();
  res.render('jobs', { jobs: jobs });
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
 * title, job_type, industry, EDUCATION, location,
 * working_hrs, "min_salary","max_salary"
 *  
 */
router.post('/job/post', async (req, res) => {
  let data = JSON.stringify({ ...req.body });
  let response = await addJob(data);
})

module.exports = router