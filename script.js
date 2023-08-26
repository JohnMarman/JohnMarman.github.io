let timer;

function showExpanded(tileId) {
  const tile = document.getElementById(tileId);
  tile.classList.add("expanded");
  tile.style.position = "fixed";
  tile.style.top = "0";
  tile.style.left = "0";
  tile.style.width = "100%";
  tile.style.height = "100vh";
  tile.style.zIndex = "1000";
  tile.style.margin = "0"; // Remove extra margins
  tile.style.padding = "0"; // Remove extra padding
  
  document.getElementById("back-button").style.display = "block";
}

function hideExpanded() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.classList.remove("expanded");
    tile.style.position = "relative";
    tile.style.top = "initial";
    tile.style.left = "initial";
    tile.style.width = "200px";
    tile.style.height = "200px";
    tile.style.zIndex = "initial";
    tile.style.margin = "20px"; // Reset to original margin
    tile.style.padding = "initial"; // Reset to original padding
  });
  
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
