const logger = require('../utils/logger');
const { Router } = require('express');
const { addJob } = require('../db_api');

const router = Router();
// ause_donating_to":"young developers coding",
// "target_amount": 25666,
//   "amount": 4323567,
//     "donation_info": "lorem rthewegerg ern  ftrhjmdfbv,xbmhtmdngbxbgfg ",
//       "date": "05-05-21",
//         "created_by": "head of Amalitech",
//           "donation_type": "Cash",
//             "image_url

router.get('/donation', async (req, res, next) => {

  res.render('donation')
})

router.post('/add_donation', (req, res, next) => {
  
})