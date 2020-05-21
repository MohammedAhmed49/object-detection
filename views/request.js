window.onload =()=>{
    const id = document.getElementById("DATA").value
    const image = document.getElementById("imageVerfiy").value
    console.log("Function was fired")
   $.ajax({
    url: "http://localhost:3000/result",
    type: "get", //send it through get method
    data: { 
      id: id, 
      image:image
    },
    success:function(res){
        console.log(res)
    } 
   })
    
}