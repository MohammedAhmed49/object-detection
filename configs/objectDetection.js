const coco = require('@tensorflow-models/coco-ssd')
const tf = require('@tensorflow/tfjs')
//require('@tensorflow/tfjs-node')

const loadModel = async(path)=>{
    const model =  new coco.ObjectDetection()
   // model.path = `file://${path}`
    await model.load()
    return model
}

const FullModel = async(Cocopath,input)=>{
    const cocoSSD = await loadModel(Cocopath)
    const detection = await cocoSSD.detect(input)
    console.log(detection)
}
const anything = async (input)=>{
    coco.load().then((result)=>{
        const model = result 
        return model.detect(input)
    }).then((predictions)=>{
        console.log(predictions)
        return predictions
    })
}
module.exports ={ FullModel , anything}