let timer;

async function getWeatherData() {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.9834&longitude=-81.233&current_weather=true');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const weatherData = await response.json();
    const weatherInfoDiv = document.querySelector('.typewriter h1');
    const temperature = Math.round(weatherData.current_weather.temperature);
    const weatherCode = weatherData.current_weather.weathercode;
    let weatherCondition = getWeatherDescription(weatherCode);
    
    const textContent = `"Good morning sir. The current weather is ${weatherCondition}, ${temperature} degrees."`;
    const textLength = textContent.length;

    weatherInfoDiv.style.animation = `typing 4.5s steps(${textLength}, end), blink-caret .5s step-end infinite;`;
    weatherInfoDiv.textContent = textContent;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

function getWeatherDescription(weatherCode) {
  if (weatherCode >= 0 && weatherCode <= 19) {
    if (weatherCode <= 2) {
      return 'clear';
    } else if (weatherCode <= 6) {
      return 'cloudy';
    } else if ([7, 8, 9, 10, 11, 12, 18, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49].includes(weatherCode)) {
      return 'foggy';
    } else {
      return 'raining';
    }
  } else if (weatherCode >= 20 && weatherCode <= 99) {
    if ([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99].includes(weatherCode)) {
      return 'raining';
    } else if (weatherCode >= 30 && weatherCode <= 39) {
      return 'duststorm';
    } else if (weatherCode >= 70 && weatherCode <= 79) {
      return 'snowing';
    } else {
      return 'unknown';
    }
  } else {
    return 'unknown';
  }
}

function showExpanded(tileId) {
  const tile = document.getElementById(tileId);
  tile.classList.add("expanded");
  tile.style.position = "fixed";
  tile.style.top = "0";
  tile.style.left = "0";
  tile.style.width = "100vw";
  tile.style.height = "auto";
  tile.style.zIndex = "1000";
  tile.style.margin = "0";
  tile.style.padding = "0";
  tile.style.borderRadius = "0";
  
 if (tileId === 'tile2') {
  const typewriter = document.querySelector(".typewriter");
  typewriter.classList.remove("hidden");
}

  document.getElementById("back-button").style.zIndex = "2001"; // Make sure back button appears above expanded tiles
  document.getElementById("back-button").style.display = "block";
}

function hideExpanded() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.classList.remove("expanded");
    tile.style.position = "relative";
    tile.style.top = "initial";
    tile.style.left = "initial";
    tile.style.width = "";
    tile.style.height = "";
    tile.style.zIndex = "initial";
    tile.style.margin = "20px";
    tile.style.padding = "initial";
    tile.style.overflow = "hidden"; // Hide overflow
    tile.style.borderRadius = "10px";

    const typewriter = document.querySelector(".typewriter");
if (typewriter) {
  typewriter.classList.add("hidden");
}
  });
  
  document.getElementById("back-button").style.zIndex = "2000"; // Reset z-index of back button
  document.getElementById("back-button").style.display = "none";
}

document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('mouseenter', function() {
    timer = setTimeout(() => showExpanded(tile.id), 3000);
  });

  tile.addEventListener('mouseleave', function() {
    clearTimeout(timer);
  });

  tile.addEventListener('click', function() {
    showExpanded(tile.id);
  });
});

getWeatherData();
