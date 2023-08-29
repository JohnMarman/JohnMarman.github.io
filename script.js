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
  tile.style.borderRadius = "0";
  
 if (tileId === 'tile1') {
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
