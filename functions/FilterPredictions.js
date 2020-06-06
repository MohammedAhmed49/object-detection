const FilterPredictions = (predictions , Objects)=>{
    let sec = 0 
    let predictionsObject = {}
    for (let i = 0 ; i < predictions.length ; i++){
 
        let exists = false
        predictions[i].forEach(element => {
            if (Objects.includes(element.class)){
                exists = true
            }
        });
        if (exists){
            predictionsObject[sec] = predictions[i]
        }
        sec +=0.5
    }
     
   return predictionsObject
}

module.exports = FilterPredictions