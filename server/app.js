require("dotenv").config()
const connectToMongo = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Users = require('./models/Users');
//const otpGenerator = require('otp-generator');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
connectToMongo()



app.post('/api/auth/send-otp', async(req,res)=>{
    const {Phone} = req.body
    console.log(Phone)
     client.verify.v2.services('VA4f90bbc4d1705c1b43bd65c445438e7e')
                .verifications
                .create({to: JSON.stringify(Phone), channel: 'sms'})
                .then(verification => console.log(verification.status))
                .then(res.json({ success: true, message: 'OTP sent successfully' }));
});

app.post('/api/auth/verify-otp', async(req,res)=>{
    const {OTP} = req.body
    const {Phone} = req.body
    // const {Email} = req.body
    // const {password} = req.body
    let success = false;
    // console.log(OTP)
    // console.log(Phone)
    //code for verifying OTP
    client.verify.v2.services('VA4f90bbc4d1705c1b43bd65c445438e7e')
      .verificationChecks
      .create({to: Phone, code: OTP})
      .then(verification_check => console.log(verification_check.status))
      .then(res.json({ success: true, message: 'OTP verified successfully' }));


    try {
        console.log(req.body);
        let user = await Users.findOne({ Email: req.body.Email });

        if (user) {
            return res.status(400).send(success,"user already exists");
        }

        //creating new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await Users.create({
            Phone: parseInt(req.body.Phone),
            Email: req.body.Email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        success = true;
        res.json({success});
    } catch (error) {
        console.error(error.message);
        // res.status(500).send(success,"some error occured");
    }
});

app.post('/api/auth/login', async(req,res)=>{
    let success = false;

    const {Email, password} = req.body;

    try{
        let user = await Users.findOne({ Email });
        if (!user) {
            return res.status(404).json({ success, errors: "use correct creadentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(404).json({success, errors: "use correct creadentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        // const authToken = jwt.sign(data, JWT_SECRETE);
        success = true;
        res.json({ success });

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
});



app.listen(5000, () => {
    console.log('Server is running on port 5000');});

