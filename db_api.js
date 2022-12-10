const axios = require('axios').default;

// const formData = new FormData();
// 'http://192.168.15.172:5050/api'

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://exceptionally-mint-toast-world-dev.wayscript.cloud/api';

const getUser = (data) => axios.post('/login', data);
const getUserByMail = (data) => axios.post('/login', data);
const addUser = (data) => axios.post('/register', data);

const addJob = (data) => axios.post('/job', data);
const getJobs = (params) => axios.get(`/job/${params}`);

const addDonation = (data) => axios.post('/donation', data);
const getDonations = (params) => axios.get(`/${params}`);

const addCollabo = (data) => axios.post('/donation', data);
const getCollabos = (params) => axios.get(`/donation/${params}`);

const addCompany = (data) => axios.post('/company', data);
const getCompanies = (params) => axios.get(`/company/${params}`);

const addToken = (data) => axios.post('/token', data);
const getToken = (data) => axios.post('/token', data);


module.exports = {
  getUser,
  getUserByMail,
  addUser,
  addJob,
  getJobs,
  addCompany,
  getCompanies,
  addCollabo,
  getCollabos,
  addDonation,
  getDonations,
  addToken,
  getToken
};