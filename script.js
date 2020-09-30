var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

function drawLeftBracket() {
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/2);
	context.lineTo((canvas.width/2)-5,canvas.height/2);
	context.lineTo((canvas.width/2)-5,(canvas.height/2)-20);
	context.lineTo((canvas.width/2),(canvas.height/2)-20);
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightBracket(){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/2);
	context.lineTo((canvas.width/2)-5,canvas.height/2);
	context.lineTo((canvas.width/2)-5,(canvas.height/2)-20);
	context.lineTo((canvas.width/2),(canvas.height/2)-20);
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(y2,ratio){
	context.beginPath(); 
	context.moveTo(canvas.width/2,0);
	y2 = ratio * y2;
	context.lineTo(canvas.width/2,y2);
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate(ratio) {
  ratio = ratio || 0;
  drawBottomLine(canvas.height,ratio);
  if(ratio<1) {
    requestAnimationFrame(function() {
      animate(ratio + 0.01);
    });
  }
}

drawLeftBracket();
drawRightBracket();
animate();