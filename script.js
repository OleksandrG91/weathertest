const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=bf35cac91880cb98375230fb443a116f&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=bf35cac91880cb98375230fb443a116f&units=metric';

// Функція для отримання погоди
async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        const currentWeather = data.weather[0].description;
        const currentTemperature = data.main.temp;
        const currentWeatherElement = document.getElementById('current-weather');
        currentWeatherElement.innerHTML = `Зараз: <span class="neon-text">${currentWeather}</span> | Температура: ${currentTemperature}&deg;C`;
    }catch (error) {
        console.error('Помилка отримання прогнозу погоди: ', error);
    }
}
// Функція для отримання прогнозу погоди
async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        const forecastList = data.list;
        const forecastWeatherElement = document.getElementById('weather-forecast');
        forecastWeatherElement.innerHTML = 'Прогноз: ';
        for (let i = 0; i < forecastList.length; i++) {
            if (i % 8 === 0) { // Виводимо прогноз на кожну третю добу
                const forecastDate = new Date(forecastList[i].dt * 1000);
                const forecastWeather = forecastList[i].weather[0].description;
                const forecastTemperature = forecastList[i].main.temp;
                const forecastWeatherItem = document.createElement('p');
                forecastWeatherItem.innerHTML = `${forecastDate.toLocaleDateString('uk-UA')}: <span class="neon-text">${forecastWeather}</span> | Температура: ${forecastTemperature}&deg;C`;
                forecastWeatherElement.appendChild(forecastWeatherItem);
            }
        }
    } catch (error) {
        console.error('Помилка отримання прогнозу погоди: ', error);
    }
}

// Виклик функцій для отримання та відображення погоди та прогнозу
getWeather();
getForecast();

    
