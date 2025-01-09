const modal = document.getElementById('weatherModal');
const closeBtn = document.querySelector('.close');

// Get weather data from OpenWeatherMap API
async function getWeatherData(cityName) {
    const apiKey = '3fab5c3f5cc369d93cf2d295a89f1321'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        document.getElementById('modal-country-name').textContent = cityName;
        document.getElementById('modal-temp').textContent = `Temperature: ${temp.toFixed(2)}°C`;
        document.getElementById('modal-description').textContent = `Weather: ${description}`;
        modal.style.display = "block";
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.getElementById('modal-country-name').textContent = cityName;
        document.getElementById('modal-temp').textContent = 'Temperature: N/A';
        document.getElementById('modal-description').textContent = 'Weather: Unable to fetch data';
        modal.style.display = "block";
    }
}

function openModal(city) {
    getWeatherData(city);
}

function closeModal() {
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
