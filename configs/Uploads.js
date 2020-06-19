const multer = require('multer')
const path = require('path');



const VideoStorage = multer.diskStorage({
   
    destination: './views/VidUploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname),()=>{
            console.log(__dirname)
        });
    }
});


const VideoUpload = multer({
    storage: VideoStorage,
})






module.exports = VideoUpload.fields([{name:'VideoUp',maxCount:1} , {name:'imageUp',maxCount:1}])