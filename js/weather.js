const APIKEY = "795ccf54192441a6a6c101516250504";
const city = "Malaga";

const weatherDIV = document.getElementById("currentWeather");

function getCurrentWeather() {
    const ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}&aqi=no`

    fetch(ENDPOINT)
        .then((response) => {
            if (!response.ok) throw new Error('Error en la solicitud');
            return response.json();
        })
        .then((data) => {
            console.log(data);
            weatherDIV.innerHTML = `
                <h2>El tiempo en ${data.location.name}</h2>
                <div class="flex">
                <div class="main-info">
                <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                <h3 class="temperature">${data.current.temp_c}°C</h3>
                </div>
                <div class="extra-info">
                <p>Precipitaciones: ${data.current.precip_in}%</p>
                <p>Humedad: ${data.current.humidity}%</p>
                <p>Viento: ${data.current.wind_kph} km/h</p>
                </div>
                </div>
                `
    })
        .catch((error) => {
            console.error("Error: No se pudo procesar la solicitud")
        });
}

getCurrentWeather();