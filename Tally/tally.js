const axios = require("axios");
const xml2js = require("xml2js");

const xmlRequest = `
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Export Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <EXPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Voucher Register</REPORTNAME>
        <STATICVARIABLES>
          <SVFROMDATE>20240401</SVFROMDATE>
          <SVTODATE>20250701</SVTODATE>
          <VOUCHERTYPENAME>Sales</VOUCHERTYPENAME>
          <SVCURRENTCOMPANY>TestCompany</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
    </EXPORTDATA>
  </BODY>
</ENVELOPE>
`;

axios
  .post("http://localhost:9000", xmlRequest, {
    headers: { "Content-Type": "application/xml" },
    timeout: 10000,
  })
  .then(async (response) => {
    const xml = response.data;

    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: true,
    });

    const json = await parser.parseStringPromise(xml);

    const tallyMessage =
      json?.ENVELOPE?.BODY?.DATA?.TALLYMESSAGE ||
      json?.ENVELOPE?.BODY?.IMPORTDATA?.REQUESTDATA?.TALLYMESSAGE ||
      json?.ENVELOPE?.BODY?.EXPORTDATA?.REQUESTDATA?.TALLYMESSAGE;

    if (!tallyMessage) {
      console.log("⚠️ No TALLYMESSAGE found in response.\nFull XML:\n", xml);
      return;
    }

    // If TALLYMESSAGE is an array, return first few vouchers
    const vouchers = Array.isArray(tallyMessage)
      ? tallyMessage.slice(0, 3)
      : [tallyMessage];

    // console.log("✅ Parsed Vouchers (first 2-3):\n", JSON.stringify(vouchers, null, 2));
    
  })
  .catch((err) => {
    console.error("❌ Error:", err.message);
  });
