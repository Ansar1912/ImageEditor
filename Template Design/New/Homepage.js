const inputfiles=document.querySelector('.dropzone-input');
const dropzonearea=inputfiles.closest('.dropzone')

dropzonearea.addEventListener("dragover",function(e){
    e.preventDefault();
});
dropzonearea.addEventListener("drop",function(e){
    e.preventDefault();
    console.log(e.dataTransfer.files);
    inputfiles.files=e.dataTransfer.files
    filedetails(e.dataTransfer.files)
});

// dropzonearea.addEventListener("change",function(e){

// });

function filedetails(files){
    
    $(".tablefilesdetails table").css("display","inline-table")
    for (let i = 0; i < files.length; i++) {
        $(".tablefilesdetails table tbody").append('<tr><td class="col-8">'+files[i].name+'</td><td class="col-2">'+Math.round((files[i].size/1024) * 100) / 100+' KB</td><td class="col-2"><button type="button mx-auto" class="btn btn-danger" value='+i+' onclick="deletefile(this.value)">Delete</button></td></tr>');
    }
}


function deletefile(value){
    newfileslog = new DataTransfer();
    removeFileFromFileList(value);
    $('.tablefilesdetails table tbody').empty();
    filedetails(inputfiles.files);
}

function removeFileFromFileList(index) {
    const dt = new DataTransfer()
    const { files } = inputfiles
    for (let i = 0; i < files.length; i++) {
      if (index != i){
        dt.items.add(files[i])
      }
    }
    inputfiles.files = dt.files
}

const ChooseBtn = document.querySelector(".choosebtn");
ChooseBtn.addEventListener("click",function(e){
    inputfiles.click();
});

const Startbtn = document.querySelector(".startbtn");
Startbtn.addEventListener("click",function(e){
    document.querySelector(".mainsubmitbtn").click();
    $('.dropzone .widthinput').val($(".panel .widthinput input").val())
    $('.dropzone .heightinput').val($(".panel .heightinput input").val())
    $('.dropzone .targetformat').val($(".panel Select").val())
});

