const tf = require('@tensorflow/tfjs-node')

const getPredications =async(model,frames)=>{
    let predictions = []
    for (let i = 0 ; i<frames.length ; i+=10){
        try{
            const image = tf.node.decodeImage(frames[i])
            predictions.push(await model.detect(image))
        }catch(err){
            console.log(`there was an error at sec ${(i/30) + 1}`)
        }
    }

   return predictions
}

const imagePrediction =async(model , image)=>{

           return ( await model.detect(image))    
}
module.exports ={imagePrediction:imagePrediction ,getPredications:getPredications}