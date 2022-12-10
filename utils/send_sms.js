const axios = require("axios").default;
require('dotenv').config();

const sendVerificationCode = async (to, code) => {

  var options = {
    method: 'GET',
    url: 'https://sms.arkesel.com/sms/api',
    params: {
      action: 'send-sms',
      api_key: process.env['ARKESEL_API_KEY'],
      ' to': to,
      from: 'SDG Connect',
      sms: `Your verification code is ${code}. Do not share this code with anyone.`
    },
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
  };
  try {
    const response = await axios.request(options);
    return response.json()
  } catch (error) {
    console.log(error);
  }
  
}

module.exports = sendVerificationCode;