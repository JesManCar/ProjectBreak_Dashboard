import images from './imagesArray.js';

const body = document.getElementById("background");

console.log(images);


function setBackground(){
    body.style.backgroundImage = `linear-gradient(rgba(182, 182, 182, 0.37), rgba(61, 61, 61, 0.616)),
    url('${images[0].path}${images[0].imgs[Math.floor(Math.random() * images[0].imgs.length)]}')`;

}

function smoothChange(){
    body.style.animation= "fadeInOut 2s linear";
    //body.style.backgroundImage = "";    
    setTimeout(() => {
        body.style.animation= "none";
    }, 2000)
}

setBackground()

//smoothChange();

setInterval(() => {
    smoothChange();
    setTimeout(() => {
        setBackground()
    }, 1000)
}
, 6000)