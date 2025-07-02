const transformInvoice = (invoice) => {
  return {
    invoice_id: invoice.invoice_number,
    date: invoice.date,
    customer: invoice.customer_name,
    total: invoice.total,
    items: invoice.line_items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.rate
    }))
  };
};

module.exports = transformInvoice;
