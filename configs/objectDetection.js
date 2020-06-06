const tf = require('@tensorflow/tfjs-node')

const getPredications =async(model,frames)=>{
    let predictions = []
    let sec = 0
    for (let i = 0 ; i<frames.length ; i++){
        try{
            const image = tf.node.decodeImage(frames[i])
            predictions.push(await model.detect(image))
        }catch(err){
            console.log(`there was an error at sec ${i/2}`)
        }
        
    }
   frames = null
   return predictions
}

const imagePrediction =async(model , image)=>{

           return ( await model.detect(image))    
}
module.exports ={imagePrediction:imagePrediction ,getPredications:getPredications}