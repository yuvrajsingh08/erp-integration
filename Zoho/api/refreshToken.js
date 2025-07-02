const axios = require('axios');
require('dotenv').config();

let cachedToken = null;

const getAccessToken = async () => {
  if (cachedToken) return cachedToken;

  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

  const url = 'https://accounts.zoho.in/oauth/v2/token';
  const params = new URLSearchParams({
    refresh_token: REFRESH_TOKEN,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'refresh_token'
  });

  try {
    const res = await axios.post(url, params);
    cachedToken = res.data.access_token;
    return cachedToken;
  } catch (err) {
    console.error('Failed to refresh access token:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = getAccessToken;
