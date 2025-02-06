document.addEventListener('DOMContentLoaded', function() {

const formWeather = document.querySelector(".formWeather");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "00ae7b96ff7ec7f981dc7dd12ee1180b";//s-1.//

formWeather.addEventListener("submit", async event => {

    event.preventDefault();//causes the form to not reload.//

    const city = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);//s-7.//

        }
        catch(error){
            console.error(error);
            displayError(error);
        }//s-6.//

    } else {
        displayError("Please enter a city");
    }//s-4.//


});//s-2.//

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(weatherData) {
    const {name: city,
          main: {temp, humidity},
          weather: [{description, id}]} = weatherData;

          card.textContent = "";
          card.style.display = "flex";

          const displayCity = document.createElement("h2");
          const displayTemp = document.createElement("p");
          const displayHumidity = document.createElement("p");
          const displayDesc = document.createElement("p");
          const weatherEmoji = document.createElement("p");//s-8.//

          displayCity.textContent = city;
          displayTemp.textContent = `${(temp - 273.15).toFixed(1)}C`;
          displayHumidity.textContent = `Humidity: ${humidity}%`;
          displayDesc.textContent = description;
          weatherEmoji.textContent = getWeatherEmoji(id);

          displayCity.classList.add("displayCity");
          displayTemp.classList.add("diplayTemp");
          displayHumidity.classList.add("displayHumidity");
          displayDesc.classList.add("displayDesc");
          weatherEmoji.classList.add("weatherEmoji");

          card.appendChild(displayCity);
          card.appendChild(displayTemp);
          card.appendChild(displayHumidity);
          card.appendChild(displayDesc);
          card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch(true) {

        case(weatherId >= 200 && weatherId < 300):
        return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
        return "⛈️";
        case(weatherId >= 500 && weatherId < 600):
        return "⛈️";
        case(weatherId >= 600 && weatherId < 700):
        return "❄️";
        case(weatherId >= 700 && weatherId < 800):
        return "🌁";
        case(weatherId === 800):
        return "☀️";
        case(weatherId >= 801 && weatherId < 810):
        return "☁️";
        default:
            return "❓";//s-10.//

    }

}

function displayError(message) {//s-3. (creating functions)//
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);//s-5.//
}

});
