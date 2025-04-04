const texts = [
"Es hora de descansar. Apaga y sigue mañana",
"Buenos días, desayuna fuerte y a darle al código",
"Echa un rato más pero no olvides comer",
"Espero que hayas comido",
"Buenas tardes, el último empujón",
"Esto ya son horas extras, ... piensa en parar pronto",
"Buenas noches, es hora de pensar en parar y descansar"
]

let hours, minutes, seconds,day, month, year;

const timeDIV = document.getElementById("time");
const dayDIV = document.getElementById("day");

function CurrentTime(){
    const currentDate = new Date();
    hours = String(currentDate.getHours()).padStart(2, '0');
    minutes = String(currentDate.getMinutes()).padStart(2, '0');
    seconds = String(currentDate.getSeconds()).padStart(2, '0');
    day = String(currentDate.getDate()).padStart(2, '0');
    month = String(currentDate.getMonth() + 1).padStart(2, '0');
    year = currentDate.getFullYear();
    //console.log(`Current time: ${hours}:${minutes}:${seconds}`);
    timeDIV.innerHTML = `${hours}:${minutes}:${seconds}`;
    dayDIV.innerHTML = `${day}/${month}/${year}`;
}

function getMotivationalText(){
    switch (true) {
        case (hours >= 0 && hours < 7):
            return texts[0];
        case (hours >= 7 && hours < 12):
            return texts[1];
        case (hours >= 12 && hours < 14):
            return texts[2];
        case (hours >= 14 && hours < 16):
            return texts[3];
        case (hours >= 16 && hours < 18):
            return texts[4];
        case (hours >= 18 && hours < 22):
            return texts[5];
        case (hours >= 22 && hours < 24):
            return texts[6];
    }
}

function motivationalText(){
    const motivationalText = getMotivationalText();
    if (document.getElementById("text"))
        document.getElementById("text").innerHTML = motivationalText;
}


CurrentTime();

setInterval(() => {
    CurrentTime();
    motivationalText()
}, 1000) // Update every second
    