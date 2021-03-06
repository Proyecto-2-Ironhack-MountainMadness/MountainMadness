const like = (element) => {
  axios
    .get(`/tracks/${element.getAttribute("data-trackid")}/like`)
    .then((response) => {
      // Change icon to liked/disliked
      // Change like number
      element.classList.toggle("unliked");
      const likeNumber = element.querySelector("span");
      likeNumber.innerText = Number(likeNumber.innerText) + response.data.add;
    })
    .catch((e) => console.error("Error liking product", e));
  };
  

/* =========  INPUT IMAGES CREAR RUTA =============== */

  $("#FileInput").on('change',function (e) {
    var labelVal = $(".title").text();
    var oldfileName = $(this).val();
        fileName = e.target.value.split( '\\' ).pop();

        if (oldfileName == fileName) {return false;}
        var extension = fileName.split('.').pop();

    if ($.inArray(extension,['jpg','jpeg','png']) >= 0) {
        $(".filelabel i").removeClass().addClass('fa fa-file-image-o');
        $(".filelabel i, .filelabel .title").css({'color':'#208440'});
        $(".filelabel").css({'border':' 2px solid #208440'});
    }
    else if(extension == 'pdf'){
        $(".filelabel i").removeClass().addClass('fa fa-file-pdf-o');
        $(".filelabel i, .filelabel .title").css({'color':'red'});
        $(".filelabel").css({'border':' 2px solid red'});

    }
else if(extension == 'doc' || extension == 'docx'){
    $(".filelabel i").removeClass().addClass('fa fa-file-word-o');
    $(".filelabel i, .filelabel .title").css({'color':'#2388df'});
    $(".filelabel").css({'border':' 2px solid #2388df'});
}
    else{
        $(".filelabel i").removeClass().addClass('fa fa-file-o');
        $(".filelabel i, .filelabel .title").css({'color':'black'});
        $(".filelabel").css({'border':' 2px solid black'});
    }

    if(fileName ){
        if (fileName.length > 10){
            $(".filelabel .title").text(fileName.slice(0,4)+'...'+extension);
        }
        else{
            $(".filelabel .title").text(fileName);
        }
    }
    else{
        $(".filelabel .title").text(labelVal);
    }
});


