const FilterPredictions = (predictions ,Objects,skipRate)=>{
    let sec = 0 
    let predictionsObject = {}
    for (let i = 0 ; i < predictions.length ; i+=5){
        let tempListOfObject = [];
        for (j = 0 ; j < 5 ; j++){
            if (i+j < predictions.length){
                tempListOfObject.push(...predictions[i+j]);
            }
           
        }
        tempListOfObject = new Set(tempListOfObject);
        tempListOfObject = [...tempListOfObject];  
        console.log(sec , ...tempListOfObject)
        let exists = false
        tempListOfObject.forEach(element => {
            
            if (Objects.includes(element)){
            
                exists = true
            }
        });
        if (exists){
            predictionsObject[sec] = tempListOfObject;
        }
        sec+=skipRate;
    }
     
   return predictionsObject
}

module.exports = FilterPredictions