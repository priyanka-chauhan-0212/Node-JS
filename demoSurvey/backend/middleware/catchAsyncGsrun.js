

const { google } = require("googleapis");
const creds = require("./client_secret.json");

const client = new google.auth.JWT(
  creds.client_email,
  null,
  creds.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
  //   creds.client_email,
  //   creds.private_key
);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Connected..");
    gsrun(client);
  }
});

module.exports = (theFunc) => (req, res, next) => {
    async function gsrun(cl);
  };