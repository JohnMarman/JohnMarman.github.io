var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

bracketstartH = canvas.height/8;

function drawLeftBracket(offset) {
	context.beginPath();
	startpointW = canvas.width/2 - offset;
	startpointH = bracketstartH;
	context.moveTo(startpointW,startpointH);
	context.lineTo(startpointW-10,startpointH);
	context.lineTo(startpointW-10,startpointH+50);
	context.lineTo(startpointW,startpointH+50);
	context.lineJoin = 'round';
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
	context.clearRect(0, 0, canvasWidth, canvasHeight);
}

function drawRightBracket(offset){
	context.beginPath();
	startpointW = canvas.width/2 + offset;
	startpointH = bracketstartH;
	context.moveTo(startpointW,startpointH);
	context.lineTo(startpointW+10,startpointH);
	context.lineTo(startpointW+10,startpointH+50);
	context.lineTo(startpointW,startpointH+50);
	context.lineJoin = 'round';
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLeftLine(offset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/8);
	if (offset > 0)
	{
		context.lineTo(canvas.width/2 - offset,canvas.height/8);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(offset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/8);
	if (offset < canvas.width)
	{
		context.lineTo(canvas.width/2 + offset,canvas.height/8);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(offset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,bracketstartH);
	if (offset < canvas.height)
	{
		context.lineTo(canvas.width/2,bracketstartH + offset);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate(offset) {
	offset = offset || 0;
	drawLeftBracket(offset);
	drawRightBracket(offset);
	drawLeftLine(offset);
	drawRightLine(offset);
	drawBottomLine(offset);
	requestAnimationFrame(function() {
		animate(offset + 1);
	});
}

animate();