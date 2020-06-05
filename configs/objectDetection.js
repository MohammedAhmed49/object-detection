const coco = require('@tensorflow-models/coco-ssd')
const tf = require('@tensorflow/tfjs')

// const loadModel = async(path)=>{
//     const model =  new coco.ObjectDetection()
//    // model.path = `file://${path}`
//     await model.load()
//     return model
// }

// const FullModel = async(Cocopath,input)=>{
//     const cocoSSD = await loadModel(Cocopath)
//     const detection = await cocoSSD.detect(input)
//     console.log(detection)
// }
const anything = async (inputs)=>{
    return new Promise (async(resolve , reject)=>{
        await coco.load().then(async(result)=>{
            const model = result
            let predictions = []
            for (input of inputs){
                try {
                    let output =  await model.detect(input)
                    predictions.push(output)
                }catch(err){
                    console.log("detection error : ",err)
                    reject(err)
                }
            }
           resolve(predictions)
        }).catch((err)=>{
            console.log(err)
            resolve(0)
        })
    })

   
}
module.exports ={ model : anything}