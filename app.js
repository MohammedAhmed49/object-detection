const express = require('express');
const router = require('./router/router')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
require('@tensorflow/tfjs-node')

const app = express();


//remove that line if u don't have Mongo installed 
mongoose.connect('mongodb://localhost:27017/GP', {useNewUrlParser: true, useUnifiedTopology: true}) .then(()=>{
    console.log("connection is established");
}).catch((err)=>{

    console.log(err);
});

app.use(express.static(__dirname+'/views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(router)

app.listen(3000 , ()=> {
console.log('app listening on port 3000')
});