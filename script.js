var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

bracketstartH = canvas.height/8;
bracketH = 50;
sidelineH = bracketstartH-(bracketH/2);

function drawLeftBracket(bracketoffset) {
    context.beginPath();
    startpointW = canvas.width/2 - offset;
    startpointH = bracketstartH;
    context.moveTo(startpointW,startpointH);
    context.lineTo(startpointW-10,startpointH);
    context.lineTo(startpointW-10,startpointH-bracketH);
    context.lineTo(startpointW,startpointH-bracketH);
    context.lineJoin = 'round';
    context.lineWidth = 0.5;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawRightBracket(bracketoffset){
    context.beginPath();
    startpointW = canvas.width/2 + offset;
    startpointH = bracketstartH;
    context.moveTo(startpointW,startpointH);
    context.lineTo(startpointW+10,startpointH);
    context.lineTo(startpointW+10,startpointH-bracketH);
    context.lineTo(startpointW,startpointH-bracketH);
    context.lineJoin = 'round';
    context.lineWidth = 0.5;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawLeftLine(lineoffset){
	context.beginPath();
	context.moveTo(canvas.width/2,sidelineH);
	if (offset > 0)
	{
		context.lineTo(canvas.width/2 - offset,sidelineH);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(sidelineoffset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,sidelineH);
	if (offset < canvas.width)
	{
		context.lineTo(canvas.width/2 + offset,sidelineH);
	}
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(bottomlineoffset){
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
  if (offset < 300)
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLeftBracket(bracketoffset);
    drawRightBracket(bracketoffset);
  }
  else
  {
    drawLeftLine(offset);
	  drawRightLine(offset);
	  drawBottomLine(offset);
  }
	requestAnimationFrame(function() {
		animate(offset + 1);
	});
}

animate();