//const APIKEY = "795ccf54192441a6a6c101516250504";
const APIKEY = "902dbc4939554f3a8d774415252104"; /* New API KEY */
const city = "Malaga";

const weatherDIV = document.getElementById("currentWeather");
const forecastDIV = document.getElementById("forecastWeather");
const titleWeather = document.getElementById("titleWeather");

function currentWeatherTemplate(weather) {
    return  `<div class="flex-center-row">
            <div class="main-info">
            <img src="${weather.condition.icon}" alt="${weather.condition.text}">
            <h3 class="temperature bold">${weather.temp_c}°C</h3>
            </div>
            <div class="extra-info">
            <p>Precipitaciones: ${weather.precip_in}%</p>
            <p>Humedad: ${weather.humidity}%</p>
            <p>Viento: ${weather.wind_kph} km/h</p>
            </div>
            </div>
            `
}

function forecastWeatherTemplate(weather) {
    return `<div class="forecast-item">
            <h3>${weather.time.slice(11)}</h3>
            <img src="${weather.condition.icon}" alt="${weather.condition.text}">
            <p>${weather.temp_c}°C</p>
            </div>`
}


function getWeather() {
     const ENDPOINT = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=1&aqi=no&alerts=yes`
    //const ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`

    fetch(ENDPOINT)
        .then((response) => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
        })
        .then((data) => {
            if(titleWeather) titleWeather.innerText = `El tiempo en: ${city}`;
            weatherDIV.innerHTML += currentWeatherTemplate(data.current);
            data.forecast.forecastday[0].hour.forEach((hour) => {
                forecastDIV.innerHTML+= forecastWeatherTemplate(hour);
            })
    })
        .catch((error) => {
            console.error("Error: No se pudo procesar la solicitud")
        });
}

function invertScrollDirection (){
    forecastDIV.addEventListener('wheel', (event) => {
        event.preventDefault();
        forecastDIV.scrollLeft += event.deltaY;
    });
}


getWeather();
invertScrollDirection();
