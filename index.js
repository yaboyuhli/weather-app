// Get references to DOM elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityName = document.querySelector('.city-name');
const currentDate = document.querySelector('.current-date');

// Add click event listener to the search button
search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetchWeatherData(city);
});

// Fetch weather data for the specified city
function fetchWeatherData(city) {
    const APIKey = 'd8e3190c6efa6e3d110a00f66daa7dd6';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                displayError();
            } else {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');
                displayWeather(json);
            }
        });
}

// Display error message if the city is not found
function displayError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

// Display weather data on the page
function displayWeather(json) {
    const cityName = document.querySelector('.weather-box .city-name');
    const currentDate = document.querySelector('.weather-box .current-date');
    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    // Set weather icon based on the weather data
    const weather = json.weather[0].main;
    const weatherIconMap = {
        Clear: 'images/clear.png',
        Rain: 'images/rain.png',
        Snow: 'images/snow.png',
        Clouds: 'images/cloud.png',
        Haze: 'images/mist.png',
    };

    // Display city name and local time
    cityName.textContent = json.name;
    const date = new Date();
    const timeZoneOffset = json.timezone;
    const localTime = new Date(date.getTime() + timeZoneOffset * 1000);
    currentDate.textContent = localTime.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    // Set weather icon
    image.src = weatherIconMap[weather] || '';

    // Display temperature, weather description, humidity, and wind speed
    temperature.innerHTML = `${Math.round((json.main.temp))}<span>°F</span>`;
    description.textContent = json.weather[0].description;
    humidity.textContent = `${json.main.humidity}%`;
    wind.textContent = `${Math.round(json.wind.speed)} mph`;

    // Show weather box and weather details
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}


// Add click event listener to the search button
search.addEventListener('click', () => {
    const city = searchInput.value;

    if (city === '')
        return;

    fetchWeatherData(city);
});

// Add keypress event listener to the search input field
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value;

        if (city === '')
            return;

        fetchWeatherData(city);
    }
});