const logger = require('../utils/logger');
const { Router } = require('express');
const { addDonation, getDonations, getDonationById } = require('../db_api');
const uploadImg = require('../utils/upload-image');
const router = Router();
// ause_donating_to":"young developers coding",
// "target_amount": 25666,
//   "amount": 4323567,
//     "donation_info": "lorem rthewegerg ern  ftrhjmdfbv,xbmhtmdngbxbgfg ",
//       "date": "05-05-21",
//         "created_by": "head of Amalitech",
//           "donation_type": "Cash",
//             "image_url

router.get('/', async (req, res) => {
  try {
    // const donations = await getDonations();
    res.render('donation' /*{ donations: donations.data }*/);
    
  } 
  catch(error) {
    logger.error(error);
    res.render('donations', { donations: []})
  }
})

router.post('/add', async (req, res) => {
  const donation = JSON.stringify({...req.body });
  try {
    let image_url = await uploadImg(donation.image_url);
    const response = await addDonation({...donation, image_url });
    res.render('donation_page', { donation: response.data });
  } catch (error) {
    console.log(error);
    req.flash('error', 'Could not add donation. Try again');
    // res.send
  }
});

router.get('/:id', async (req, res) => {
  try {
    const donation = await getDonationById(req.params.id);
    res.render('donation', { donation: donation.data });
  } catch (error) {
    logger.error(error);
    req.flash('error', error.message);
    // req.
  }
})

module.exports = router;