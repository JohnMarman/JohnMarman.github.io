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

let timer;
let clonedImgClick = null;
let clonedImgHover = null;
let originalPosition = null;
let originalDimensions = null;
let isEnlarged = false;

function enlargeImg(imgElement, source, tileId) {
    if (isEnlarged) return;
    if ((source === 'click' && clonedImgClick) || (source === 'hover' && clonedImgHover)) {
        resetImg(source);
        return;
    }

    console.log("Enlarging Image");
    document.getElementById('reset-btn').style.display = 'block';

    originalPosition = imgElement.getBoundingClientRect();
    originalDimensions = { width: imgElement.offsetWidth, height: imgElement.offsetHeight };

    let clonedImg = imgElement.cloneNode(true);
    isEnlarged = true;
    clonedImg.style.position = "fixed";
    clonedImg.style.top = `${originalPosition.top}px`;
    clonedImg.style.left = `${originalPosition.left}px`;
    clonedImg.style.width = `${originalPosition.width}px`;
    clonedImg.style.height = `${originalPosition.height}px`;
    clonedImg.style.zIndex = "1000";
    clonedImg.style.transition = "all 0.5s";
    clonedImg.style.borderRadius = "10px";
    clonedImg.style.filter = "brightness(1) blur(5px)";
    clonedImg.style.objectFit = "cover";

    document.body.appendChild(clonedImg);

    const newHeight = (originalDimensions.height * window.innerWidth) / originalDimensions.width;
    const newTop = (window.innerHeight - newHeight) / 2;
  
  if (tileId === 'tile2') {
        const typewriter = document.querySelector(".typewriter");
        if (typewriter) {
            typewriter.classList.remove("hidden");
        }
    }

    setTimeout(() => {
    clonedImg.style.width = "100vw";
    clonedImg.style.height = `${newHeight}px`;
    clonedImg.style.objectFit = "cover";
    clonedImg.style.top = `${newTop >= 0 ? newTop : 0}px`;
    clonedImg.style.left = '0';
    clonedImg.style.transform = 'none';
    clonedImg.style.pointerEvents = 'none';
    clonedImg.style.borderRadius = "0px";
    clonedImg.style.filter = "brightness(0.5) blur(5px)";
    }, 0);

    if (source === 'click') {
        clonedImgClick = clonedImg;
    } else {
        clonedImgHover = clonedImg;
    }
}

function resetImg(source) {
    console.log("Resetting Image");
    let clonedImg = source === 'click' ? clonedImgClick : clonedImgHover;
    if (clonedImg) {
        document.getElementById('reset-btn').style.display = 'none';
        isEnlarged = false;
        clonedImg.style.width = `${originalDimensions.width}px`;
        clonedImg.style.height = `${originalDimensions.height}px`;
        clonedImg.style.top = `${originalPosition.top}px`;
        clonedImg.style.left = `${originalPosition.left}px`;
        clonedImg.style.transition = "all 0.5s, filter 0.5s, border-radius 0.5s";
        clonedImg.style.filter = "brightness(1) blur(0px)";
        clonedImg.style.borderRadius = "10px";

        setTimeout(() => {
            if (clonedImg && clonedImg.parentNode === document.body) {
                document.body.removeChild(clonedImg);
            }
            if (source === 'click') {
                clonedImgClick = null;
            } else {
                clonedImgHover = null;
            }
            originalPosition = null;
            originalDimensions = null;
        }, 500);
      const typewriter = document.querySelector(".typewriter");
        if (typewriter) {
            typewriter.classList.add("hidden");
        }
    }
}

document.querySelectorAll('.tile img').forEach(img => {
    img.addEventListener('mouseenter', function () {
        timer = setTimeout(() => enlargeImg(img, 'hover', img.parentElement.id), 3000);
    });

    img.addEventListener('mouseleave', function () {
        clearTimeout(timer);
    });

    img.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(timer);
        if (!isEnlarged) {
            enlargeImg(img, 'click', img.parentElement.id);
        }
    });
});

document.getElementById('reset-btn').addEventListener('click', function () {
    if (clonedImgClick) {
        resetImg('click');
    } else {
        resetImg('hover');
    }
});

getWeatherData();
