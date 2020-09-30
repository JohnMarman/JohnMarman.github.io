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
	context.lineTo((canvas.width/2)-10,canvas.height/2);
	context.lineTo((canvas.width/2)-10,(canvas.height/2)-50);
	context.lineTo((canvas.width/2),(canvas.height/2)-50);
	context.lineJoin = 'round';
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightBracket(){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/2);
	context.lineTo((canvas.width/2)+10,canvas.height/2);
	context.lineTo((canvas.width/2)+10,(canvas.height/2)+50);
	context.lineTo((canvas.width/2),(canvas.height/2)+50);
	context.lineJoin = 'round';
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawLeftLine(y2,ratio){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/4);
	y2 = ratio * y2;
	context.lineTo(y2,canvas.height/4);
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(y2,ratio){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/4);
	y2 = ratio * y2;
	context.lineTo(y2,canvas.height/4);
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(y2,ratio){
	context.beginPath(); 
	context.moveTo(canvas.width/2,0);
	y2 = ratio * y2;
	context.lineTo(canvas.width/2,y2);
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate(ratio) {
  ratio = ratio || 0;
  drawLeftLine(0,ratio);
  drawRightLine(canvas.width,ratio);
  drawBottomLine(canvas.height,ratio);
  if(ratio<1) {
    requestAnimationFrame(function() {
      animate(ratio + 0.05);
    });
  }
}

drawLeftBracket();
drawRightBracket();
animate();