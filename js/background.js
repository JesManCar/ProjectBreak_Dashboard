import images from './imagesArray.js';

const body = document.getElementById("background");
let selector;
let selectorSpeed;
let idInterval;

function setIndexTextBackground(){
    if(document.getElementById("background-selected")){
        const backgroundSelected = document.getElementById("background-selected");
        const num = localStorage.getItem("backgroundType") || 0;
        const nameBack = num == 0 ? "Naturaleza" : (num == 1 ? "Deportes" : "Espacio Exterior");
        backgroundSelected.innerHTML = 
        `Fondo seleccionado:
        <div class="background-name bold">${nameBack}</div>`;
    }
    if(document.getElementById("speed-selected")){
        const speedSelected = document.getElementById("speed-selected");
        const num = localStorage.getItem("speedChange") || 10000;
        const nameBack = num == 5000 ? "Rápido (5'')" : (num == 10000 ? "Normal (10'')" : "Lento (15'')");
        speedSelected.innerHTML = 
        `Velocidad de cambio seleccionada:
        <div class="background-name bold">${nameBack}</div>`;
    }
}

if(document.getElementById("select")){
    selector = document.getElementById("select");
}
let type = localStorage.getItem("backgroundType") || 0;

if(document.getElementById("selectSpeed")){
    selectorSpeed = document.getElementById("selectSpeed");
}
let speedChange = localStorage.getItem("speedChange") || 10000;

function setBackground(type){
    body.style.backgroundImage = `linear-gradient(rgba(182, 182, 182, 0.37), rgba(61, 61, 61, 0.616)),
    url('${images[type].path}${images[type].imgs[Math.floor(Math.random() * images[type].imgs.length)]}')`;

};
function smoothChange(){
    body.style.animation= "fadeInOut 2s linear";
    setTimeout(() => {
        body.style.animation= "none";
    }, 2000)
}

function Background(){
    if(selector && selector.value) type = selector.value
    localStorage.setItem("backgroundType", type)
    smoothChange();
    setTimeout(() => {
        setBackground(type)
    }, 1000)
}

function selectedCategory(element){
    if (element) {
        element.classList.remove("none");
    }
    setTimeout(() => {
        element.classList.add("none");
    }, 3000)
}

setBackground(type);
setIndexTextBackground();
chargeGallery();

idInterval = setInterval(() => {
    Background();
}, speedChange || 10000)

if(selector)
    selector.addEventListener("change", (e) => {
        Background();
        chargeGallery();
        selectedCategory(document.querySelector(".selected-category"));
});

if(selectorSpeed)
    selectorSpeed.addEventListener("change", (e) => {
        speedChange = selectorSpeed.value;
        localStorage.setItem("speedChange", speedChange);
        selectedCategory(document.getElementById("speedSelected"));
        clearInterval(idInterval);
        idInterval = setInterval(() => {
            Background();
        }, speedChange)
});


function chargeGallery (){
    if(selector && selector.value) type = selector.value;
    if(document.getElementById("galleryContainer")){
    const galleryContainer = document.getElementById("galleryContainer");
    galleryContainer.innerHTML ="";
    images[type].imgs.forEach(img => {
        galleryContainer.insertAdjacentHTML("afterbegin",`
        <li class="preview-img">
            <img src=${images[type].path}${img}>
        </li>
        `)
    });
}
}