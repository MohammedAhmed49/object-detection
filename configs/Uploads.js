const multer = require('multer')
const path = require('path');


const VideoStorage = multer.diskStorage({
    destination: './VidUploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname));
    }
});


const VideoUpload = multer({
    storage: VideoStorage,
    // fileFilter: function (req, file, cb) {
    //     // const fileTypes = /avi|flv|mp4|jpg |jpeg|png/;
    //     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    //     const mimeType = fileTypes.test(file.mimetype);
    //     if (extname && mimeType) {
    //         cb(null, true);
    //     }
    //     else {
    //         cb("error videos only");
    //     }
    // },

})






module.exports = VideoUpload.fields([{name:'VideoUp',maxCount:1} , {name:'imageUp',maxCount:1}])