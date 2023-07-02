const mongoose = require('mongoose');
const { Schema } = mongoose;

const authenticate = new Schema({
  Phone:{
    type:Number,
    required:true
  },

  Email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

});
module.exports = mongoose.model('authenticate', authenticate);