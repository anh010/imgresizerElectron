// image variables
const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const fileName = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadImage(e){
    const file = e.target.files[0];

    if(!isFileImage(file)){
        console.log("Please use image file type.");
        return;
    }
    // get original dimension
    const image =  new Image();
    // create file object 
    image.src = URL.createObjectURL(file);
    // get dimen info
    image.onload= function () {
        widthInput.value = this.width;
        heightInput.value = this.height;
    }

    // console.log('success');
    // reveal form on success
    form.style.display='block';
    //display file name
    fileName.innerText = file.name;
    // 

}

// check file is image
function isFileImage(file){
    const imgTypes = ['image/gif','image/png','image/jpeg'];
    return file && imgTypes.includes(file['type']);
}

img.addEventListener('change', loadImage);


