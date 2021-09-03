const express = require('express')

const mailjet = require ('node-mailjet')
.connect('9152e1a3e9e2bdbca48f09eb2351dbac', '0ae2d591fe52c4ec8141df2b9293a542')
require('dotenv').config();


const app = express()
const port = process.env.PORT || 3000 
var bodyParser=require("body-parser"); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json())
const cors = require('cors');
const { json } = require('body-parser');
app.use(
    cors({
    origin:"https://anshcodes.web.app"
})
)

// app.use(express.static('public'))
 app.post('/form', (req, res) => {
  res.send('Hello World!')
  const txt = req.body;
  console.log(typeof(req.body[0].name));
const msg = {
    to: `${req.body[0].email}`, // Change to your recipient
    from: 'sonkusare.satish12@gmail.com', // Change to your verified sender
    subject: 'Thanks For Visiting our Site',
    text: `Thanks ${req.body[0].name} for visiting our site , Ansh Sonkusare(owner ) will contact you on this email itself `,
    html: '<strong>Thanks</strong>',
  }
  
  const request = mailjet
  .post("send", {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "sonkusare.satish12@gmail.com",
          "Name": "Ansh"
        },
        "To": [
          {
            "Email": `${req.body[0].email}`,
            "Name": `${req.body[0].name}`
          }
        ],
        "Subject": "Thanks for visiting our website",
        "TextPart": "Ansh Sonkusare",
        "HTMLPart":  `Thanks ${req.body[0].name} for visiting our site , Ansh Sonkusare(owner ) will contact you on this email itself `,
        "CustomID": "ProdMail"
      }
    ]
  })
  const request2 = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "sonkusare.satish12@gmail.com",
        "Name": "Ansh"
      },
      "To": [
        {
          "Email": "sonkusare.satish1@gmail.com",
          "Name": "Ansh"
        }
      ],
      "Subject": "Someone visited your website",
      "TextPart": `${req.body[0].name}`,
      "HTMLPart": "Visited your website , contact him asap ",
      "CustomID": "SelfEmail"
    }
  ]
})
request2
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })
  
request
.then((result) => {
  console.log(result.body)
})
.catch((err) => {
  console.log(err.statusCode)
})
})

app.get('/' , (req, res) => {
    res.send('hello')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
 
})


