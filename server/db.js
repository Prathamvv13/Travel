require("dotenv").config()
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_DB_URI;


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,{
        dbName: 'Travel'
    }).then((result)=> console.log("Connected to Database")).catch(error=>handleError(error));
}

module.exports = connectToMongo;