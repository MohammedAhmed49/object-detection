const fs = require('fs')
const model = require('./objectDetection').model
const readImage = require('./ReadImage').readImage
const Detect =async(VideoName)=>{
    let counter = 1
    let predication = []
    while (true){
        let path = VideoName+`/${counter}.jpg`
        if (fs.existsSync(path)){
            const image = readImage(path)
            const pred = await model(image)
            let obj = {
                frame : counter,
                classes : [],
                bboxes:[]
            }
            pred.forEach(element => {
                obj.classes.push(element.class)
                obj.bboxes.push(...element.bbox)
            });
            predication.push(obj)
        }
        else{
            break;
        }
        counter++;
    }
    return predication
}   

module.exports = Detect