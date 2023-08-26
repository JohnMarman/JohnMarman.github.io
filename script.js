let timer;

function showExpanded(tileId) {
  const tile = document.getElementById(tileId);
  tile.style.position = "fixed";
  tile.style.top = "0";
  tile.style.left = "0";
  tile.style.width = "100%";
  tile.style.height = "100vh";
  tile.style.zIndex = "1000";
  
  document.getElementById("back-button").style.display = "block";
}

function hideExpanded() {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(tile => {
    tile.style.position = "relative";
    tile.style.top = "initial";
    tile.style.left = "initial";
    tile.style.width = "200px";
    tile.style.height = "200px";
    tile.style.zIndex = "initial";
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
