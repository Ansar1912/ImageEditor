
const image = document.getElementById('image');
const cropper = new Cropper(image, {
  aspectRatio: 0,
  viewMode: 2,
  autoCropArea: 1,
  // background: false,
  zoomable: false,
  crop(event) {
    let data=cropper.getData()
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
var bottomindex = 0

// Adding image on the right side of the panel
inputfile = document.querySelector("input")
inputfile.addEventListener("change", (e) => {
  $(".cropshow img").attr("src", "testimage/" + inputfile.files[0].name)
  let sidepanelimg=$(".middlebody img")
  for (let i = 0; i < 3; i++) {
    sidepanelimg[i].src="testimage/" + inputfile.files[i].name
    bottomindex = i
    if (i == 3){
      break;
    }
  }
});

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
  if($(".middlebody .thirdimg").attr("class").indexOf(" active")<0)
  {
    let allimg = $(".middlebody img")
    for(let i=0;i<allimg.length-1;i++)
    {
      console.log(allimg[i].className.indexOf(" active"))
      if(allimg[i].className.indexOf(" active")>0)
      {
        allimg[i].className = allimg[i].className.replace(" active", "")
        console.log(allimg[i])
        allimg[i+1].className+=" active"
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

    let newimg = '<img class="thirdimg" src="testimage/' + inputfile.files[bottomindex].name + '" onclick="imgclickevent(this)">'
    $('.middlebody').append(newimg)
    let allimg = $(".middlebody img")
    allimg[0].className = allimg[0].className.replace("secondimg", "firstimg")
    allimg[1].className = allimg[1].className.replace("thirdimg", "secondimg")
    // allimg[2].className = allimg[2].className.replace("firstimg", "thirdimg")
    rightpanelimg = document.querySelectorAll(".middlebody img");
  }
})

document.querySelector(".header button").addEventListener("click", (e) => {
  if($(".middlebody .firstimg").attr("class").indexOf(" active")<0)
  {
    let allimg = $(".middlebody img")
    for(let i=1;i<allimg.length;i++)
    {
      console.log(allimg[i].className.indexOf(" active"))
      if(allimg[i].className.indexOf(" active")>0)
      {
        allimg[i].className = allimg[i].className.replace(" active", "")
        console.log(allimg[i])
        allimg[i-1].className+=" active"
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

    let newimg = '<img class="firstimg" src="testimage/' + inputfile.files[topindex].name + '" onclick="imgclickevent(this)">'
    $('.middlebody').prepend(newimg)
    let allimg = $(".middlebody img")
    // allimg[0].className = allimg[0].className.replace("secondimg", "firstimg")
    allimg[1].className = allimg[1].className.replace("firstimg", "secondimg")
    allimg[2].className = allimg[2].className.replace("secondimg", "thirdimg")
    // rightpanelimg = document.querySelectorAll(".middlebody img");
  }
})

