const coco = require('@tensorflow-models/coco-ssd')

const loadModel =async()=>{
    try{
        const model = await coco.load()
        return model
    }catch(err){
        console.log("there was an error loading the model trying re-loading attempt...")
        return 0;
    }
}

module.exports = loadModel