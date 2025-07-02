const axios = require('axios');
const getAccessToken = require('./refreshToken');
require('dotenv').config();

const fetchInvoiceDetails = async (invoiceId) => {
  const ORG_ID = process.env.ORG_ID;
  const accessToken = await getAccessToken();

  const headers = {
    Authorization: `Zoho-oauthtoken ${accessToken}`
  };

  const url = `https://www.zohoapis.in/books/v3/invoices/${invoiceId}?organization_id=${ORG_ID}`;
  const response = await axios.get(url, { headers });

  return response.data.invoice;
};

module.exports = fetchInvoiceDetails;
