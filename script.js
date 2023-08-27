let timer;

function showExpanded(tileId) {
  const tile = document.getElementById(tileId);
  tile.classList.add("expanded");
  tile.style.position = "fixed";
  tile.style.top = "0";
  tile.style.left = "0";
  tile.style.width = "100vw";
  tile.style.height = "100vh";
  tile.style.zIndex = "1000";
  tile.style.margin = "0";
  tile.style.padding = "0";
  tile.style.overflow = "hidden";  // Hide overflow
  
  // If the tile being clicked is the first tile, add the typewriter text
  if (tileId === 'tile1') {
    const textDiv = document.createElement("div");
    textDiv.className = 'typewriter';
    textDiv.innerText = 'Goodmorning sir. The current weather is cloudy, 23 degrees.';
    tile.appendChild(textDiv);
  }
  
  document.getElementById("back-button").style.zIndex = "2001";  // Make sure back button appears above expanded tiles
  document.getElementById("back-button").style.display = "block";
}

function hideExpanded() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.classList.remove("expanded");
    tile.style.position = "relative";
    tile.style.top = "initial";
    tile.style.left = "initial";
    tile.style.width = "";  // Removed width set here
    tile.style.height = "";  // Removed height set here
    tile.style.zIndex = "initial";
    tile.style.margin = "20px";
    tile.style.padding = "initial";

    // Remove typewriter div if it exists
    const typewriterDiv = tile.querySelector('.typewriter');
    if (typewriterDiv) {
      tile.removeChild(typewriterDiv);
    }
  });

  document.getElementById("back-button").style.zIndex = "2000";  // Reset z-index of back button
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
