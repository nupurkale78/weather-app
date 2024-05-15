document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".top-banner form");
  const input = document.querySelector(".top-banner input");
  const msg = document.querySelector(".top-banner .msg");
  const list = document.querySelector(".ajax-section .cities");

  // Provided API key
  const apiKey = "fcb8f9d4ebcedf4fc213994060d43f06";

  form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    // AJAX here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather } = data;
        const weatherCondition = weather[0].main;
        const temperature = main.temp;

        // Create city card element
        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
          <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
          </h2>
          <div class="city-temp">${Math.round(temperature)}<sup>°C</sup></div>
          <figure>
            <img class="city-icon" src="http://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png" alt="${weather[0]["description"]}">
            <figcaption>${weather[0]["description"]}</figcaption>
          </figure>
        `;
        li.innerHTML = markup;
        list.appendChild(li);

        // Change background color based on weather condition
        changeCardBackgroundColor(weatherCondition, li);
      })
      .catch(() => {
        msg.textContent = "Please search for a valid city 😩";
      });

    msg.textContent = "";
    form.reset();
    input.focus();
  });

  function changeCardBackgroundColor(weatherCondition, cardElement) {
    switch (weatherCondition) {
      case 'Clear':
        cardElement.style.backgroundColor = "#FFD700"; // Gold for clear weather
        break;
      case 'Clouds':
        cardElement.style.backgroundColor = "#8ecae6"; // Light Steel Blue for cloudy weather
        break;
      case 'Rain':
      case 'Drizzle':
        cardElement.style.backgroundColor = "#778da9"; // Steel Blue for rainy weather
        break;
      case 'Smoke':
        cardElement.style.backgroundColor = "#A9A9A9"; // Dark Gray for smoke weather
        break;
      // Add more cases for other weather conditions
      default:
        cardElement.style.backgroundColor = "#FFFFFF"; // White for other conditions
        break;
    }
  }
});