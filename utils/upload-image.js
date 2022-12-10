const axios = require('axios');
const dotenv = require('dotenv').config()

/**
 * Function to upload to upload image to opuload.io
 */
async function uploadImg(file) {

  const UPLOAD_IO_ACCOUNT_ID = process.env['UPLOAD_IO_ACCOUNT_ID'];
  const UPLOAD_IO_PUBLIC_API_KEY = process.env['UPLOAD_IO_PUBLIC_API_KEY'];
  
  const url = `https://api.upload.io/v2/accounts/${UPLOAD_IO_ACCOUNT_ID}/uploads/binary}`;
  
  const headers = {
    'Content-Type': 'image/jpeg',
    'Authorization': `Bearer ${UPLOAD_IO_PUBLIC_API_KEY}`
  }
  
  
  // # recipients_list =
  
    // def send_sms_alert(img_path, recipients_list = ["233245426202, 233542941448, 233541230852"]):
  file = open(img_path, 'rb')
  try {
    const response = await axios.post(url, data = file, headers = headers);
    fileUrl = response.json()['fileUrl']
    return fileUrl
    
  } catch (error) {
    console.log(error);
    return error.message;
  }
}