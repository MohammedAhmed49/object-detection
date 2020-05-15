const express = require('express');
const VideoUpload = require('../configs/Uploads')
const DataBase = require('../models/Database')
const {model,anything} = require('../configs/objectDetection')

const url = require('url')
const readImage  = require('../configs/ReadImage')
const router = express();



router.get('/',(req,res)=>{

    let path = __dirname; 
    path = path.replace('router','views/index.html')
    res.sendFile(path)
 
})

router.post('/',VideoUpload,(req,res)=>{
    console.log('Video Name : ' ,req.files)
    let obj = {
    }
    if (req.files.imageUp !== undefined){
        // const prediction = (await model).detect(req.body.imageUp)
        // console.log(prediction)
         obj = {
            VideoName:req.files.VideoUp[0].filename,
            ImageName:req.files.imageUp[0].filename
        }
    }
    else {
        obj = {
            VideoName:req.files.VideoUp[0].filename,
            objects:[req.body.objects]
        }
    }
    console.log(obj) 
    let ID = -1 
    DataBase.create(obj).then((doc)=>{
        console.log(doc)
        return res.redirect(url.format({
            pathname:'/result',
            query:{
                id: doc._id.toString(),
            }
    
        }))
    }).catch((err)=>{
        console.log(err)
        return res.redirect(url.format({
            pathname:'/result',
            query:{
                id: 0
            }
    
        }))
    })
    
   
})


router.get('/result',(req,res)=>{
    res.send({'Result':'nothing'})
    const ActualModel =  model
    let path = __dirname 
    path = path.replace('router','VidUploads')
    const ImageName = path + '/imageUp-1589491328827.jpg'
    const VideoName = path + '/VideoUp-1589490877429.mp4'
    const Cocopath = 'model/mobilenet_v2/model.json';
    const image = readImage(ImageName)
    const Video = readVideo(VideoName)
    console.log("end")
    const output =  anything(image)
    console.log(output)
    // const input = imageToInput(image)
    // model(Cocopath,image)
     
})
module.exports = router;