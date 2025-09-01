async function getWeatherData()
{
	try
	{
		const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=42.9834&longitude=-81.233&current_weather=true');
		if (!response.ok)
		{
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
	}
	catch (error)
	{
		console.error('There has been a problem with your fetch operation:', error);
	}
}

function getWeatherDescription(weatherCode)
{
	if (weatherCode >= 0 && weatherCode <= 19)
	{
		if (weatherCode <= 2)
		{
			return 'clear';
		}
		else if (weatherCode <= 6)
		{
			return 'cloudy';
		}
		else if ([7, 8, 9, 10, 11, 12, 18, 19, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49].includes(weatherCode))
		{
			return 'foggy';
		}
		else
		{
			return 'raining';
		}
	}
	else if (weatherCode >= 20 && weatherCode <= 99)
	{
		if ([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99].includes(weatherCode))
		{
			return 'raining';
		}
		else if (weatherCode >= 30 && weatherCode <= 39)
		{
			return 'duststorm';
		}
		else if (weatherCode >= 70 && weatherCode <= 79)
		{
			return 'snowing';
		}
		else
		{
			return 'unknown';
		}
	}
	else
	{
		return 'unknown';
	}
}

let timer;
let clonedImgClick = null;
let clonedImgHover = null;
let originalPosition = null;
let originalDimensions = null;
let isEnlarged = false;

function enlargeImg(imgElement, source, tileId)
{
	if (!imgElement || !source || !tileId || isEnlarged) return;
	resetImg(source);
	document.getElementById('reset-btn').style.display = 'block';
  
	originalPosition = imgElement.getBoundingClientRect();
	originalDimensions = { width: imgElement.offsetWidth, height: imgElement.offsetHeight };
	let clonedImg = imgElement.cloneNode(true);
    
	let container = document.createElement('div');
	container.className = 'enlarged-container';
	container.style.cssText = `
		position: fixed;
		top: ${originalPosition.top}px;
		left: ${originalPosition.left}px;
		width: ${originalDimensions.width}px;
		height: ${originalDimensions.height}px;
		overflow: hidden;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
		transition: top 0.5s ease, left 0.5s ease, width 0.5s ease, height 0.5s ease;
	`;
	document.body.appendChild(container);
	container.appendChild(clonedImg);

	clonedImg.style.cssText = `
		width: 100%;
		height: auto;
		object-fit: cover;
		filter: blur(5px);
	`;
    
	let details;
	let detailedDescription = document.getElementById(tileId).querySelector('.detailed-description');
	if (detailedDescription)
	{
		details = document.createElement('div');
		details.className = 'detailed-description-overlay';
		details.innerHTML = detailedDescription.innerHTML;
		details.style.cssText = `
			position: absolute;
			bottom: 0;
			width: calc(100% - 40px);
			color: white;
			padding: 20px;
			background: rgba(0, 0, 0, 0.7);
			box-sizing: border-box;
			transition: opacity 0.5s ease;
			opacity: 0;
		`;
		
	container.appendChild(details);
	}
	else
	{
		console.log("no detailed description")
	}
	
	setTimeout(() => {
		container.style.width = '100vw';
		container.style.height = '100vh';
		container.style.top = '0px';
		container.style.left = '0px';
		container.style.overflow = 'auto';
		if (details)
		{
			details.style.opacity = '1';
		}
        }, 0);
    
	document.body.style.overflow = 'hidden';
  
	if (tileId === 'tile4')
	{
		const typewriter = document.querySelector(".typewriter");
		if (typewriter)
		{
			typewriter.classList.remove("hidden");
		}
	}
	
	if (tileId === 'tile7')
	{
		showGameJamsTiles();
	}

	isEnlarged = true;
	if (source === 'click')
	{
		clonedImgClick = container;
	}
	else
	{
		clonedImgHover = container;
	}
}

function resetImg(source)
{
	let clonedImg = source === 'click' ? clonedImgClick : clonedImgHover;
	if (clonedImg)
	{
		let details = clonedImg.querySelector('.detailed-description-overlay'); 
		if (details)
		{
			details.style.opacity = '0';
		}
		clonedImg.style.transition = 'filter 0.5s ease';
		document.getElementById('reset-btn').style.display = 'none';
		isEnlarged = false;
		clonedImg.style.width = `${originalDimensions.width}px`;
		clonedImg.style.height = `${originalDimensions.height}px`;
		clonedImg.style.top = `${originalPosition.top}px`;
		clonedImg.style.left = `${originalPosition.left}px`;
		clonedImg.style.transition = "all 0.5s, filter 0.5s, border-radius 0.5s";
		clonedImg.style.filter = "brightness(1) blur(0px)";
		clonedImg.style.borderRadius = "10px";
		clonedImg.style.overflow = 'hidden';

		setTimeout(() => {
			if (clonedImg && clonedImg.parentNode === document.body)
			{
				document.body.removeChild(clonedImg);
			}
			if (source === 'click')
			{
				clonedImgClick = null;
			}
			else
			{
				clonedImgHover = null;
			}
			originalPosition = null;
			originalDimensions = null;
		}, 500);
		
		const typewriter = document.querySelector(".typewriter");
		if (typewriter)
		{
			typewriter.classList.add("hidden");
		}
      
		hideGameJamsTiles();
	}
}

function showGameJamsTiles()
{
	const gameJamsTiles = document.querySelector('.game-jams-tiles');
	const projectTiles = document.querySelector('.project-tiles');
	gameJamsTiles.style.display = 'flex';
	projectTiles.style.display = 'none';
}

function hideGameJamsTiles()
{
	const gameJamsTiles = document.querySelector('.game-jams-tiles');
	const projectTiles = document.querySelector('.project-tiles');
	gameJamsTiles.style.display = 'none';
	projectTiles.style.display = 'flex';
}

document.querySelectorAll('.tile img').forEach(img => {
	img.addEventListener('mouseenter', function () {timer = setTimeout(() => enlargeImg(img, 'hover', img.parentElement.id), 3000);});
	img.addEventListener('mouseleave', function () {clearTimeout(timer);});
	img.addEventListener('click', function (event)
	{
		event.preventDefault();
        	event.stopPropagation();
        	clearTimeout(timer);
        	if (!isEnlarged) {enlargeImg(img, 'click', img.parentElement.id);}
	});
});

document.getElementById('reset-btn').addEventListener('click', function () {
	if (clonedImgClick) {resetImg('click');}
	else {resetImg('hover');}
});

getWeatherData();
