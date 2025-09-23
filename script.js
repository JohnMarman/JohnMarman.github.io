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

// NEW: declare these if they aren't already
let originalPosition = null;
let originalDimensions = null;

// NEW: robust body-only scroll lock (no scrollbars needed)
let __scrollLockCount = 0;

function lockBodyScroll() {
  if (__scrollLockCount === 0) {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.dataset.scrollY = String(y);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  __scrollLockCount++;
}

function unlockBodyScroll() {
  __scrollLockCount = Math.max(0, __scrollLockCount - 1);
  if (__scrollLockCount === 0) {
    const y = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.removeAttribute('data-scroll-y');
    // restore the exact scroll position
    window.scrollTo(0, y);
  }
}


let timer;
let clonedImgClick = null;
let clonedImgHover = null;
let isEnlarged = false;

let originalRect = null;

// ADD near the top with your other globals
let activeTileId = null;           // track which tile is open
let activeTileEl = null;

// Helper: safely (re)measure the tile if it's visible
function getVisibleRect(el) {
  if (!el) return null;
  // If an ancestor is display:none, rect width/height will be 0
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) return rect;
  return null;
}

function scrollToBottom(el) {
  el.scrollTop = el.scrollHeight;
}


function enlargeImg(imgElement, source, tileId) {
  if (!imgElement || !source || !tileId || isEnlarged) return;

  // Close any existing enlarged containers first
  resetImg('click');
  resetImg('hover');
  
  activeTileId = tileId;
  activeTileEl = document.getElementById(tileId);

  // Measure BEFORE locking
  const tileEl = imgElement.closest('.tile') || imgElement;
  const rect = tileEl.getBoundingClientRect();
  originalPosition = rect;
  originalDimensions = { width: rect.width, height: rect.height };

  // Build overlay (unchanged except z-index)
  const container = document.createElement('div');
  container.className = 'enlarged-container';
  container.style.cssText = `
    position: fixed;
    top: ${rect.top}px;
    left: ${rect.left}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    background: rgba(0, 0, 0, 0.5);
    transition: top .5s ease, left .5s ease, width .5s ease, height .5s ease, border-radius .5s ease;
    border-radius: 10px;
    overflow: hidden;
    z-index: 1000;
  `;
  document.body.appendChild(container);

  const clonedImg = imgElement.cloneNode(true);
  clonedImg.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: blur(10px);
    transition: filter .5s ease;
  `;
  container.appendChild(clonedImg);

  const detailedDescription = document.getElementById(tileId).querySelector('.detailed-description');
  let details;
  if (detailedDescription) {
    details = document.createElement('div');
    details.className = 'detailed-description-overlay';
    details.innerHTML = detailedDescription.innerHTML;
    container.appendChild(details);

    details.scrollTop = 0;

    // Optional: if you add content via JS later, call scrollToBottom(details) after the append
  }

  // Lock ONLY the body (no layout shift now that main has the offset)
  document.body.classList.add('no-scroll');

  // Animate to fullscreen (under the header)
  container.getBoundingClientRect();
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.style.top = '0px';
      container.style.left = '0px';
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.borderRadius = '0px';
      if (details) {
		details.style.opacity = '1';
		// keep user at the top on open
		details.scrollTop = 0;
	}
    });
  });

  document.getElementById('reset-btn').style.display = 'block';

  if (tileId === 'tile4') document.querySelector(".typewriter")?.classList.remove("hidden");
  if (tileId === 'tile7') showGameJamsTiles();

  isEnlarged = true;
  if (source === 'click') { clonedImgClick = container; } else { clonedImgHover = container; }
}

window.addEventListener('resize', () => {
  if (!isEnlarged || !activeTileEl) return;
  const rect = getVisibleRect(activeTileEl);
  if (rect) {
    // only update if the tile is visible; otherwise keep the saved rect
    originalPosition = rect;
    originalDimensions = { width: rect.width, height: rect.height };
  }
});

function resetImg(source) {
  const container = source === 'click' ? clonedImgClick : clonedImgHover;
  if (!container) return;

  // Re-measure the active tile unless it's hidden (width/height 0)
  if (activeTileEl) {
    const rect = getVisibleRect(activeTileEl);
    if (rect) {
      originalPosition = rect;
      originalDimensions = { width: rect.width, height: rect.height };
    }
    // if not visible, we keep the saved originalPosition as a fallback
  }

  const img = container.querySelector('img');
  const details = container.querySelector('.detailed-description-overlay');
  if (details && details.__observer) {
    details.__observer.disconnect();
    delete details.__observer;
  }

  if (details) details.style.opacity = '0';
  isEnlarged = false;

  // Animate back to the (possibly re-measured) rect
  container.style.width  = `${originalDimensions.width}px`;
  container.style.height = `${originalDimensions.height}px`;
  container.style.top    = `${originalPosition.top}px`;
  container.style.left   = `${originalPosition.left}px`;
  container.style.borderRadius = '10px';
  if (img) img.style.filter = 'blur(0px)';

  const cleanup = (ev) => {
	  if (ev.target !== container) return;
	  if (ev.propertyName !== 'width' && ev.propertyName !== 'height') return;

	  if (container.parentNode === document.body) document.body.removeChild(container);

	  // ✅ Only null the ref if it still points to THIS container
	  if (source === 'click' && clonedImgClick === container) clonedImgClick = null;
	  if (source === 'hover' && clonedImgHover === container) clonedImgHover = null;

	  // Re-enable scroll only if none left
	  if (!document.querySelector('.enlarged-container')) {
		document.body.classList.remove('no-scroll');
	  }

	  document.querySelector(".typewriter")?.classList.add("hidden");
	  hideGameJamsTiles();
	  activeTileId = null;
	  activeTileEl = null;

	  // Show/hide BACK depending on whether any overlay remains
	  const stillOpen = document.querySelector('.enlarged-container');
	  document.getElementById('reset-btn').style.display = stillOpen ? 'block' : 'none';

	  container.removeEventListener('transitionend', cleanup);
	};


  container.addEventListener('transitionend', cleanup);
}

function showGameJamsTiles() {
  const gameJamsTiles = document.querySelector('.game-jams-tiles');
  const projectTiles  = document.querySelector('.project-tiles');

  // Prepare and reveal the section so it can animate
  gameJamsTiles.classList.remove('hidden');

  // Stagger each tile slightly
  gameJamsTiles.querySelectorAll('.tile').forEach((tile, i) => {
    tile.style.transitionDelay = `${i * 50}ms`;
  });

  // Hide the project grid right away (no need to animate it unless you want to)
  projectTiles.style.display = 'none';

  // Kick off the animation
  requestAnimationFrame(() => gameJamsTiles.classList.add('is-active'));
}

function hideGameJamsTiles() {
  const gameJamsTiles = document.querySelector('.game-jams-tiles');
  const projectTiles  = document.querySelector('.project-tiles');

  // Remove the active class to animate out
  gameJamsTiles.classList.remove('is-active');

  // After transition finishes, hide it and bring back projects
  setTimeout(() => {
    gameJamsTiles.classList.add('hidden');
    projectTiles.style.display = 'flex';
  }, 350); // match the CSS transition duration
}

function getTopOverlay() {
  const list = document.querySelectorAll('.enlarged-container');
  return list.length ? list[list.length - 1] : null;
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
  const top = getTopOverlay();
  if (!top) return;
  // Decide which ref it belongs to
  const useSource = (top === clonedImgClick) ? 'click' : 'hover';
  resetImg(useSource);
});

getWeatherData();