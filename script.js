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
	context.lineTo((canvas.width/2)+10,(canvas.height/2)-50);
	context.lineTo((canvas.width/2),(canvas.height/2)-50);
	context.lineJoin = 'round';
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawLeftLine(current){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/8);
	if (current > 0)
	{
		context.lineTo(canvas.width/2 - current,canvas.height/8);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(current){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/8);
	if (current < canvas.width)
	{
		context.lineTo(canvas.width/2 + current,canvas.height/8);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(current){
	context.beginPath(); 
	context.moveTo(canvas.width/2,0);
	if (current < canvas.height) 
	{
		context.lineTo(canvas.width/2,current);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate() {
  drawLeftLine(current);
  drawRightLine(current);
  drawBottomLine(current);
  requestAnimationFrame(function() {
      animate(current + 0.05);
    });
}

drawLeftBracket();
drawRightBracket();
animate();