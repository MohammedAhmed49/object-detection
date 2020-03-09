const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DB = new schema({
    Date : Date,
    object :String,
    VideoName:String
  });