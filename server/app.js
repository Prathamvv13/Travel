const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const otpGenerator = require('otp-generator');
const accountSid = 'AC13dbf4903d8693c6418a9a90f9ccb8cc';
const authToken = '863ed140cee11767f5f33a0cfd89cf3b';
const client = require('twilio')(accountSid, authToken);

// Middleware
app.use(bodyParser.json());
app.use(cors());


app.post('http://localhost:5000/send-otp', async (req,res)=>{
    const {phone} = req.body
    await client.verify.v2.services('VA4f90bbc4d1705c1b43bd65c445438e7e')
                .verifications
                .create({to: Phone, channel: 'sms'})
                .then(verification => console.log(verification.status))
                .then(res.send(verification.status));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');});

