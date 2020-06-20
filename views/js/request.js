window.onload =async()=>{

    const id = document.getElementById("data_id").value
    const request = await fetch(`http://localhost:3000/result?id=${id}`,{
      method:'GET'
    })

    console.log(request.status)

    const data = await request.json();
    console.log(data)
    // console.log(data);
    $('.result-section video source').attr('src', `VidUploads/${data.videoName}`);
    $('.result-section video')[0].load();
    const results = data.results
    for(let item in results){
      const classes = results[item];
      let child = `<li><span>${item}</span>: ${classes.join(' ')}</li>`;
      $('.list-seconds ul').append(child);

    }
    var vid = $('.result-section video')[0];
    $(".list-seconds li").click(function(){
      const sc = Number($(this).find('span').text());
      console.log(sc);
      skipTime(sc);
    });

    function skipTime(time) {
      vid.play();
      vid.pause();
      vid.currentTime = time;
      vid.play();
    };

    $('.loading-section').fadeOut();
    $('.result-section').delay(400).fadeIn();

    
    
    
}