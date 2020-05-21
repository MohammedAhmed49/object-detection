const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath);
const extractFrames = require('ffmpeg-extract-frames')

const GetVideoLength = async (path)=>{

     return new Promise((resolve , reject)=>{
        ffmpeg.ffprobe(path,(err,data)=>{
            if (!err){
                resolve(data.format.duration)
            }
            else {
                reject(err)
            }
        })
    })
    
}   

const EF =async(path,id)=>{
    
    let ID = false
    let values = []
    let VL = await GetVideoLength(path)
    console.log("video length : %d sec " , VL)
    VL = Math.floor(VL) * 1000
   
     for (let i = 1000 ; i <= 50 * 1000 ; i += 1000){
         values.push(i)
     }
     id = id.toString()
     
    if (!fs.existsSync('./Frames')){
        fs.mkdirSync('./Frames')
    }
    console.log("Frame Extraction Started")
    await extractFrames({
        input:path,
        output:`./Frames/${id.toString()}/%i.jpg`,
        offsets:[...values]
     }).then(()=>{
        
        console.log("Frames have been extracted")
        ID = true
    }).catch((err)=>{
        console.log("error :" , err)

    })
    return ID
}

module.exports = {extractFrames:EF}