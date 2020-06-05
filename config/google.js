var {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleVerify = (token) => {
  client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  }).then((ticket) => {
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
    console.log("user id");
    console.log(userid);
  }).catch((err) => {
    console.log(err);
  });
}