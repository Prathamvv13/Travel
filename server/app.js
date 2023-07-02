require("dotenv").config()
const connectToMongo = require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require("./routes/authRouter");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api/auth",authRouter);

connectToMongo();

app.listen(5000, () => {
    console.log('Server is running on port 5000');});

