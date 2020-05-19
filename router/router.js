const express = require('express');
const VideoUpload = require('../configs/Uploads')
const DataBase = require('../models/Database')
const model = require('../configs/objectDetection').model
const {extractFrames,VideoLen} = require('../configs/extractFrames')
const {readImage,readVideo}  = require('../configs/ReadImage')
const Detect = require('../configs/DetectObjectsInVideo')
const url = require('url')
const router = express();



router.get('/',(req,res)=>{

    let path = __dirname; 
    path = path.replace('router','views/index.html')
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
            return res.redirect(url.format({
                pathname:'/result',
                query:{
                    id: doc._id.toString(),
                    image : true
                }
                
            }))
        }
        else {
            return res.redirect(url.format({
                pathname:'/result',
                query:{
                    id: doc._id.toString(),
                    image : false
                }
                
            }))
        }
   
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


router.get('/result',async(req,res)=>{
    console.log(req.query)
    if (req.query.id==0){
        res.redirect('/')
    }
    else {

        DataBase.findById(req.query.id , async(err,doc)=>{
            if (!err){
                console.log("Document " ,doc)
                if (req.query.image){
                        let path = __dirname 
                        path = path.replace('router','VidUploads')
                        path = path + '/'+doc.ImageName
                        
                        const image = readImage(path)
                        const prediction = await model(image)
                        console.log("prediction : " ,prediction)
                        let objects = []
                        prediction.forEach(Element =>{
                            objects.push(Element.class)
                        })
                        console.log(objects)
                        path = path.replace(doc.ImageName , doc.VideoName)

                        const FramesExtracted = await extractFrames(path,req.query.id)
  
                        if (FramesExtracted){
                            path = __dirname
                            path = path.replace('router','Frames')
                            path = path + '/'+req.query.id.toString()
                            const predictions = await Detect(path) 
                            console.log(predictions)
                        }
                       
                        //console.log("Extracted frames",FramesExtracted)
                }
            
            }
        })
        res.send(req.query)
    }
    // let path = __dirname 
    // path = path.replace('router','VidUploads')

    // const ImageName = path + '/imageUp-1589491328827.jpg'
    // // const VideoName = path + '/VideoUp-1589490877429.mp4'
 
    // const image = readImage(ImageName)
    // const output =  anything(image)

     
})
module.exports = router;