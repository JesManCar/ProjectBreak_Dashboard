import images from './imagesArray.js';

const body = document.getElementById("background");
let selector;

function setIndexTextBackground(){
    if(document.getElementById("background-selected")){
        const backgroundSelected = document.getElementById("background-selected");
        const num = localStorage.getItem("backgroundType") || 0;
        const nameBack = num == 0 ? "Naturaleza" : (num == 1 ? "Deportes" : "Espacio Exterior");
        backgroundSelected.innerHTML = 
        `Fondo seleccionado:
        <div class="background-name bold">${nameBack}</div>`;
    }
}

if(document.getElementById("select")){
    selector = document.getElementById("select");
}
let type = localStorage.getItem("backgroundType") || 0;

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

function selectedCategory(){
    const categoriaSelected = document.querySelector(".selected-category");
    if (categoriaSelected) {
        categoriaSelected.classList.remove("none");
    }
    setTimeout(() => {
        categoriaSelected.classList.add("none");
    }, 3000)
}


setBackground(type);
setIndexTextBackground();

setInterval(() => {
    Background();
}, 10000)

if(selector)
    selector.addEventListener("change", (e) => {
    Background();
    selectedCategory();
});