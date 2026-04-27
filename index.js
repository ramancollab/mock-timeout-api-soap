const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.text({ type: "text/xml" }));

app.post("/soap", async (req, res) => {
  console.log("SOAP request received");

  const delay = 300000; // 5 minutes (enough to trigger OIC timeout)

  await new Promise(r => setTimeout(r, delay));

  const response = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Body>
        <ns2:response xmlns:ns2="http://example.com/">
          <message>Delayed response</message>
        </ns2:response>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  res.set("Content-Type", "text/xml");
  res.send(response);
});

app.listen(3000, () => console.log("SOAP mock running"));
