const inputfiles = document.querySelector('.dropzone-input');
const dropzonearea = inputfiles.closest('.dropzone')
dropzonearea.addEventListener("dragover", function (e) {
    e.preventDefault();
});

dropzonearea.addEventListener("drop", function (e) {
    e.preventDefault();
    inputfiles.files = e.dataTransfer.files
    filedetails(inputfiles.files)
});

function filedetails(files) {

    $(".tablefilesdetails table").css("display", "inline-table")
    for (let i = 0; i < files.length; i++) {
        $(".tablefilesdetails table tbody").append('<tr><td class="col-8">' + files[i].name + '</td><td class="col-2">' + Math.round((files[i].size / 1024) * 100) / 100 + ' KB</td><td class="col-2"><button type="button mx-auto" class="btn btn-danger" value=' + i + ' onclick="deletefile(this.value)">Delete</button></td></tr>');
    }
}

function deletefile(value) {
    newfileslog = new DataTransfer();
    removeFileFromFileList(value);
    $('.tablefilesdetails table tbody').empty();
    filedetails(inputfiles.files);
}

function removeFileFromFileList(index) {
    const dt = new DataTransfer()
    const { files } = inputfiles
    for (let i = 0; i < files.length; i++) {
        if (index != i) {
            dt.items.add(files[i])
        }
    }
    inputfiles.files = dt.files
}

const ChooseBtn = document.querySelector(".choosebtn");
ChooseBtn.addEventListener("click", function (e) {
    inputfiles.click();
});

const Startbtn = document.querySelector(".startbtn");
Startbtn.addEventListener("click", function (e) {
    $('.dropzone .targetformat').val($(".settings .targetformat select").val())
    console.log(imgposition)
    console.log(watermarkpos)
    var position = $(".settings .watermarkposition select").val()
    watermarksize(position, imgposition, watermarkpos)
    document.querySelector(".mainsubmitbtn").click();
});


document.querySelector('.dropzoneform').addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    for (var i = 0; i < imgposition.length; i++) {
        formData.append('imgposition[]', imgposition[i]);
    }
    $.ajax({
        url: '',
        type: 'POST',
        data: formData,
        success: function (response) {
            $('#downloadlink').attr('href', response.filename)
            $('#downloadlink button').attr('disabled',false)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});


function watermarksize(position, imgposition, watermarkpos) {
    for (let i = 0; i < imgposition.length; i += 2) {
        // [i]=width [i+1]=height
        switch (position) {
            case "Top-Left":
                imgposition[i] = 0;
                imgposition[i + 1] = 0;
                break
            case "Top-Right":
                imgposition[i] -= watermarkpos[0];
                imgposition[i + 1] = 0;
                break
            case "Bottom-Left":
                imgposition[i] = 0;
                imgposition[i + 1] -= watermarkpos[1];
                break
            case "Bottom-Right":
                imgposition[i] -= watermarkpos[0];;
                imgposition[i + 1] -= watermarkpos[1];
                break

        }
    }
}

function imgsize(img, file) {
    img.src = _URL.createObjectURL(file);
    img.onload = function () {
        imgposition.push(this.width)
        imgposition.push(this.height)
    };
}


var imgposition = []

var _URL = window.URL || window.webkitURL;
inputfiles.addEventListener('change', async function (e) {
    let totalwidth = 0, totalheight = 0;
    for (let i = 0; i < inputfiles.files.length; i++) {
        var file, img;
        if ((file = this.files[i])) {
            img = new Image();
            await imgsize(img, file);
        }
    }
    filedetails(inputfiles.files)
});

var watermarkpos = []

watermarkbtn = document.querySelector(".watermarkbtn")
watermarkbtn.addEventListener("click", function () {
    document.querySelector('.watermark-input').click();
});


watermarkfile = document.querySelector(".watermark-input");
watermarkfile.addEventListener("change", function (evt) {

    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.readAsDataURL(files[0]);
        var img = new Image();
        img.src = _URL.createObjectURL(files[0]);

        img.onload = function () {
            watermarkpos.push(this.width)
            watermarkpos.push(this.height)
        }
        fr.onload = function () {
            document.querySelector('.watermark img').src = fr.result;
        }

    }
})
