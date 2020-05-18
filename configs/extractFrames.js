const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath);
const extractFrames = require('ffmpeg-extract-frames')

const VL = (path)=>{
    ffmpeg.ffprobe(path,(err,data)=>{
        if (!err){
            console.log(data)
            return data
        }
       else {
           console.log(err)
       }
    })
}
const EF =async(path,id)=>{
    let ID = false
     let values = []
     for (let i = 1000 ; i < 100000 ; i += 1000){
         values.push(i)
     }
     id = id.toString()
     
    if (!fs.existsSync('./Frames')){
        fs.mkdirSync('./Frames')
    }
    
     await extractFrames({
        input:path,
        output:`./Frames/${id.toString()}/%i.jpg`,
        offsets:[
            ...values
        ]
    }).then(()=>{
        
        console.log("Frames have been extracted")
        ID = true
    }).catch((err)=>{
        console.log("error :" , err)

    })
    return ID
}

module.exports = {extractFrames:EF,
    VideoLen:VL}