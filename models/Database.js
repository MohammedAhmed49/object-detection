const mongoose = require('mongoose');
const schema = mongoose.Schema;

const DB = new schema({
    objects :{
      type:[String]
    },
    VideoName:{
      type:String,
      required:true
    },
    ImageName:{
      type:String,
    },
    skipRate:{
      type:Number,
      default:0,
      required:true
    },
    resultID:{
      type:String
    }
  });

  const Model = mongoose.model('Model',DB);
  module.exports = Model;