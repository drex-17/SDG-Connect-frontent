const axios = require('axios').default;

// const formData = new FormData();
// 'http://192.168.15.172:5050/api'

const URL = "https://exceptionally-mint-toast-world-dev.wayscript.cloud/api";
const URL1 = "https://exceptionally-mint-toast-world-dev.wayscript.cloud/api";

axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.baseURL = '';
axios.defaults.baseURL = URL1;

const getUser = (data) => axios.get('/user', { data: data });
const getUserByPhone = (data) => axios.get('/user', { data: data });
const addUser = (data) => axios.post('/user/add', { data: data });

const addJob = (data) => axios.post('/job', { data: data });
const getJobs = (data) => {
  console.log(data);
  return axios.get('/job', { data: data });
}

const addDonation = (data) => axios.post('/donations', { data: data });
const getDonations = (params) => axios.get(`/donations`);

const addCollabo = (data) => axios.post('/donation', { data: data });
const getCollabos = (params) => axios.get(`/donation`);

const addCompany = (data) => axios.post('/company', { data: data });
const getCompanies = (params) => axios.get(`/company`);

const addToken = (data) => axios.post('/token', { data: data });
const getToken = (data) => axios.post('/token', { data: data });


module.exports = {
  getUser,
  getUserByPhone,
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