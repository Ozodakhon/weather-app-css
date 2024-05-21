var input = document.getElementById("city");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

const weatherIcons = {
  "01d": "./imgs/sunny.png",
  "01n": "./imgs/sunny.png",
  "02d": "./imgs/partly-cloudy.png",
  "02n": "./imgs/partly-cloudy.png",
  "03d": "./imgs/cloudy.png",
  "03n": "./imgs/cloudy.png",
  "04d": "./imgs/cloudy.png",
  "04n": "./imgs/cloudy.png",
  "09d": "./imgs/showers.webp",
  "09n": "./imgs/showers.webp",
  "10d": "./imgs/rain.png",
  "10n": "./imgs/rain.png",
  "11d": "./imgs/thunderstorm.png",
  "11n": "./imgs/thunderstorm.png",
  "13d": "./imgs/snow.png",
  "13n": "./imgs/snow.png",
  "50d": "./imgs/fog.png",
  "50n": "./imgs/fog.png"
};

function getWeather() {
  const apiKey = "1daa07ad0ced9292ef4ee2d7a49fe884";
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Shahar nomini kiriting!");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      alert("Ma'lumotlarni yuklashda xatolik. Qayta urunib ko'ring.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
      alert("Ma'lumotlarni yuklashda xatolik. Qayta urunib ko'ring.");
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temperature");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = weatherIcons[iconCode];

    const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

    const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  const next24Hours = hourlyData.slice(0, 8); // 3-hour intervals

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000); // Milliseconds
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
            <div class="item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}
