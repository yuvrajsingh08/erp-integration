const axios = require('axios');
const getAccessToken = require('./refreshToken');
require('dotenv').config();

const fetchInvoices = async () => {
  const ORG_ID = process.env.ORG_ID;
  const accessToken = await getAccessToken();

  const headers = {
    Authorization: `Zoho-oauthtoken ${accessToken}`
  };
  const url = `https://www.zohoapis.in/books/v3/invoices?organization_id=${ORG_ID}`;
  const response = await axios.get(url, { headers });

  return response.data.invoices;
};

module.exports = fetchInvoices;
