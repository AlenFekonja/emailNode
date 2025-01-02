const express = require("express");
const sendgridMail = require("@sendgrid/mail");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



app.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;
  
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to, 
    from: "alen.fek.sola@gmail.com", 
    subject: subject,
    text: text,
  };

  try {
    await sendgridMail.send(msg);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
