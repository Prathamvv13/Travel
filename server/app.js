require("dotenv").config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const otpGenerator = require('otp-generator');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.post('/api/auth/send-otp', (req,res)=>{
    const {Phone} = req.body
    console.log(Phone)
     client.verify.v2.services('VA4f90bbc4d1705c1b43bd65c445438e7e')
                .verifications
                .create({to: JSON.stringify(Phone), channel: 'sms'})
                .then(verification => console.log(verification.status))
                .then(res.json({ success: true, message: 'OTP sent successfully' }));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');});

