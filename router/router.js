const express = require('express');
const VideoUpload = require('../configs/Uploads')
const DataBase = require('../models/Database')
const model = require('../configs/objectDetection').model
const {extractFrames,GetVideoLength}= require('../configs/extractFrames')
const {readImage,readVideo}  = require('../configs/ReadImage')
const Detect = require('../configs/DetectObjectsInVideo')
const FilterPredictions = require('../functions/FilterPredictions')
const url = require('url')
const router = express();
router.set('views')
router.set('view engine', 'ejs');

router.get('/',(req,res)=>{

    let path = __dirname; 
    path = path.replace('router','views/updatedIndex.html')
    
    res.sendFile(path)
 
})

router.post('/',VideoUpload,async(req,res)=>{
    console.log('Video Name : ' ,req.files)
    let obj = {
    }
    let imageExist = false
   
    if (req.files.imageUp !== undefined){
        
       
        imageExist = true
         obj = {
            VideoName:req.files.VideoUp[0].filename,
            ImageName:req.files.imageUp[0].filename,
            
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
        if (imageExist){
            console.log("image exists and rendering to animation")
            return res.render('animation',{query:doc._id.toString(),image:true})
        }
        else {
            console.log("image Doesn't exists and rendering to animation")
            return res.render('animation',{query:doc._id.toString(),image:false})
        }
   
    }).catch((err)=>{
        console.log(err)
        return res.redirect('/')
    })
    
   
})


router.get('/result',async(req,res)=>{
    console.log(req.query)

    if (req.query.id==0){
        return res.redirect('/')
    }
    else {
        try {
            const doc = await DataBase.findById(req.query.id).exec()
            if (doc == null){
               return res.redirect('/')   
            }
            else {
                let objects = []

                if (req.query.image){
                    let path = __dirname 
                    path = path.replace('router','VidUploads')
                    path = path + '/'+doc.ImageName
                    
                    const image = readImage(path)
                    let input = [image]
                    let prediction = await model(input)
                    while(prediction===0){
                        console.log("model Failed to load....")
                        console.log("please wait for reload attempt...")
                        prediction = await model(input)
                    }
                   // console.log("prediction : " ,prediction)
                    
                    prediction[0].forEach(Element =>{
                        objects.push(Element.class)
                    })
                    console.log(objects)


                
            
                   
            }
            else {
                objects = doc.objects
                console.log(objects)
            }   
            let  videoPath = __dirname 
            videoPath = videoPath.replace('router','VidUploads')
            videoPath = videoPath + '/'+doc.VideoName
            
            const {width,height} = await GetVideoLength(videoPath)
            let frames =await readVideo(videoPath,width,height)
            console.log("frames length", frames.length)
            console.log("i am here sending results")
            res.send({"ready":"0"})    
            }
        }catch(err){
            console.log(err)
           return res.redirect('/')
        }
        
    

    }
 
     
})

module.exports = router;