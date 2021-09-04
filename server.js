const express = require('express')
const nodeMailer = require('nodemailer')
// const mailjet = require('node-mailjet')
//   .connect('9152e1a3e9e2bdbca48f09eb2351dbac', '0ae2d591fe52c4ec8141df2b9293a542')
require('dotenv').config();

let transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      // should be replaced with real sender's account
      user: process.env.selfmail,
      pass: process.env.password
  }
});

const app = express()
const port = process.env.PORT || 3000
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.json())
const cors = require('cors');
const {
  json
} = require('body-parser');
app.use(
  cors({
    origin: "*",
    Access-Control-Allow-Origin: '*'
  })
)
console.log(1);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});




app.post('/form', (req, res) => {
  res.send('Hello World!')
  let mailOptions1 = {
 
    to: req.body[0].email,
    subject: 'Thanks For Visiting our Site',
    text: `Thanks ${req.body[0].name} for visiting our site , Ansh Sonkusare(owner ) will contact you on this email itself `
};

let mailOptions2 = {
  
  to: 'sonkusare.satish12@gmail.com',
  subject: "Someone visited your website",
  text: `${req.body[0].name} Visited your website , contact him asap   , msg : ${req.body[0].msg}`
};
  
transporter.sendMail(mailOptions1, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});

transporter.sendMail(mailOptions2, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.response);
});

})


app.get('/', (req, res) => { 
      res.send('Hello World!')
  
  })
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})
