const express = require('express');
const multer = require('multer')
const path = require('path');
const router = express();



// multer config 
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const fileTypes = /avi|flv|mp4|wmv/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extname && mimeType) {
            cb(null, true);
        }
        else {
            cb("error videos only");
        }
    }
}).single('fileup');
router.get('/',(req,res)=>{

    let path = __dirname; 
    path = path.replace('router','views/index.html')
    res.sendFile(path)

})
router.post('/',(req,res)=>{
    upload(req,res,(err)=>{
        if(!err){
            return res.redirect('/result')
        }
    });
})
module.exports = router;