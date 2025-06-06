const apiKey = "36f4b6c310a255af2f94e2d7dfeff4ad";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const name = data.name;
      const temp = data.main.temp;
      const condition = data.weather[0].main;
      const icon = data.weather[0].icon;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;

      weatherInfo.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${condition}" />
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Condition:</strong> ${condition}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
      `;
    })
    .catch(error => {
      weatherInfo.innerHTML = `<p>${error.message}</p>`;
    });
});
