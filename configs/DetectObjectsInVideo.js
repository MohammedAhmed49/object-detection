const fs = require('fs')
const model = require('./objectDetection').model
const readImage = require('./ReadImage').readImage
const Detect =async(VideoName)=>{
    let counter = 1
    let Tensors = []
    while (true){
        let path = VideoName+`/${counter}.jpg`
        if (fs.existsSync(path)){
            const image = readImage(path)
            Tensors.push(image)
            console.log(counter)
            // const pred = await model(image)
           
        }
        else{
            break;
        }
        counter++;
    }
    let prediction = await model(Tensors)
    while(prediction===0){
        console.log("model Failed to load....")
        console.log("please wait for reload attempt...")
        prediction = await model(Tensors)
    }
    let predictions = []
    for (pred of prediction){
         let obj = {
                frame : counter,
                classes : [],
                bboxes:[]
            }
            pred.forEach(element => {
                obj.classes.push(element.class)
                obj.bboxes.push(element.bbox)
            });
            predictions.push(obj)
    }
    return predictions
}   

module.exports = Detect