window.onload =async()=>{

    const id = document.getElementById("data_id").value
    const request = await fetch(`http://localhost:3000/result?id=${id}`,{
      method:'GET'
    })

    console.log(request.status)
    console.log(await request.json())
//  const newUrl = url.format({
//    pathname:"http://localhost:3000/result",
//    id:id,
//    image:image
//  })
//  console.log(newUrl)
  
//     const response = await fetch(newUrl,{
//       method:'GET',
//     })
//     console.log(response.status )
//     console.log(await response.json())

    
}