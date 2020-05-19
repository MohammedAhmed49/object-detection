const FilterPredictions = (predictions , Objects)=>{
    let newPredictions = []
        const listOfObjects = [... new Set(Objects)]
        for (let i = 0 ; i < predictions.length ; i++){
            let obj = {
                frame:predictions[i].frame,
                classes:[],
                bboxes:[]
            }
             for (let j = 0 ; j < predictions[i].classes.length ; j++){
                    
                        if (listOfObjects.includes(predictions[i].classes[j])){
                            obj.classes.push(predictions[i].classes[j])
                            obj.bboxes.push(predictions[i].bboxes[j])
                        }
                   
             }
             if (obj.classes.length!==0){
                newPredictions.push(obj)
             }
        }
   return newPredictions
}

module.exports = FilterPredictions