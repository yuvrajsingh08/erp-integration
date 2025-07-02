const fetchInvoices = require('./api/fetchInvoices');
const fetchInvoiceDetails = require('./api/fetchInvoiceDetails');
const transformInvoice = require('./utils/transform');

const main = async () => {
  try {
    const invoices = await fetchInvoices();
    const result = [];

    for (const invoice of invoices) {
      const detailed = await fetchInvoiceDetails(invoice.invoice_id);
      const transformed = transformInvoice(detailed);
      result.push(transformed);
    }

    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
};

main();
