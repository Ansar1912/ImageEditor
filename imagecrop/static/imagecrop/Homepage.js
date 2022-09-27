
const image = document.getElementById('image');
const cropper = new Cropper(image, {
  aspectRatio: 0,
  viewMode: 2,
  autoCropArea: 1,
  // background: false,
  zoomable: false,
  crop(event) {
    let data = cropper.getData()
    console.log(Math.round(data.x));
    console.log(Math.round(data.y));
    // console.log(event.detail.y);
    // console.log(event.detail.width);
    // console.log(event.detail.height);
    // console.log(event.detail.rotate);
    // console.log(event.detail.scaleX);
    // console.log(event.detail.scaleY);
  },
});

var topindex = 0;
var bottomindex = 2;

// Adding image on the right side of the panel
inputfile = document.querySelector(".mynavbar input")
inputfile.addEventListener("change", (e) => {
  for (let index = 0; index < 3; index++) {
    loadingimg(index);
  }
});

function loadingimg(i) {
  let sidepanelimg = $(".middlebody img")
  let reader = new FileReader();
  reader.onload = ((e) => {
    sidepanelimg[i].src = e.target.result
  })
  reader.readAsDataURL(inputfile.files[i])
}

document.querySelector(".uploadbtn").addEventListener("click", (e) => {
  $(".mynavbar input").click();
})

// Active class right side of the panel
function imgclickevent(e) {
  let current = document.querySelector(".middlebody .active");
  current.className = current.className.replace(" active", "");
  e.className += " active";
  // Showing new active image in the cropshow
  cropper.replace($(".middlebody .active").attr("src"))
}

// up button processing
document.querySelector(".footer button").addEventListener("click", (e) => {
  if ($(".middlebody .thirdimg").attr("class").indexOf(" active") < 0) {
    let allimg = $(".middlebody img")
    for (let i = 0; i < allimg.length - 1; i++) {
      if (allimg[i].className.indexOf(" active") > 0) {
        allimg[i].className = allimg[i].className.replace(" active", "")

        allimg[i + 1].className += " active"
        break;
      }

    }

  }
  else if (topindex >= 0 && bottomindex < inputfile.files.length - 1) {
    topindex++
    bottomindex++
    let rightpanelimg = $(".middlebody .firstimg")
    if ((rightpanelimg).attr("class").indexOf("active") >= 0) {
      let current = document.querySelector(".middlebody .secondimg");
      current.className += " active";

    }
    rightpanelimg.slideUp();
    rightpanelimg.remove();
    let reader = new FileReader();
    let newimg = '<img class="thirdimg" src="" onclick="imgclickevent(this)">'
    $('.middlebody').append(newimg)
      let allimg = $(".middlebody img")
      allimg[0].className = allimg[0].className.replace("secondimg", "firstimg")
      allimg[1].className = allimg[1].className.replace("thirdimg", "secondimg")
      // loading the new img
    reader.onload=(e)=>{
      $(".middlebody img")[2].src=e.target.result
    }
    console.log(bottomindex)
    reader.readAsDataURL(inputfile.files[bottomindex])
  }
  $(".middlebody .active").click()
})

document.querySelector(".header button").addEventListener("click", (e) => {
  if ($(".middlebody .firstimg").attr("class").indexOf(" active") < 0) {
    let allimg = $(".middlebody img")
    for (let i = 1; i < allimg.length; i++) {

      if (allimg[i].className.indexOf(" active") > 0) {
        allimg[i].className = allimg[i].className.replace(" active", "")
        allimg[i - 1].className += " active"
        break;
      }

    }
  }
  else if (topindex > 0) {
    topindex--
    bottomindex--
    let rightpanelimg = $(".middlebody .thirdimg")
    if ((rightpanelimg).attr("class").indexOf("active") >= 0) {
      let current = document.querySelector(".middlebody .secondimg");
      current.className += " active";
    }

    rightpanelimg.slideDown();
    rightpanelimg.remove();
    let reader=new FileReader();
    let newimg = '<img class="firstimg" src="" onclick="imgclickevent(this)">'
    $('.middlebody').prepend(newimg)
    let allimg = $(".middlebody img")
    // allimg[0].className = allimg[0].className.replace("secondimg", "firstimg")
    allimg[1].className = allimg[1].className.replace("firstimg", "secondimg")
    allimg[2].className = allimg[2].className.replace("secondimg", "thirdimg")
    reader.onload=(e)=>{
      $(".middlebody img")[0].src=e.target.result
    }
    reader.readAsDataURL(inputfile.files[topindex])
  }
  $(".middlebody .active").click()
})

document.querySelector(".cropbtn").addEventListener("click", (e) => {
  let formdata = new FormData();
  let allimg = $(".middlebody img")
  for(let i=0;i<3;i++){
    if(allimg[i].className.indexOf("active")>0)
    {
        console.log(inputfile.files[topindex+i])
        formdata.append('file',inputfile.files[topindex+i])
        break;
    }
  }
  console.log(formdata)
//  let currentimg = $(".cropshow img").attr("src")

  $.ajax({
    url: '',
    type: 'POST',
    data: formdata,
    success: function (response) {
//      console.log(response)
      // $('#downloadlink').attr('href', response.filename)
      // $('#downloadlink button').attr('disabled',false)
    },
    cache: false,
    contentType: false,
    processData: false
  });
})
