var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

bracketbottomH = canvas.height/8;
bracketH = 50;
bracketarmW = 10;
sidelineH = bracketbottomH - (bracketH/2);
bracketclamp = 300;

function drawLeftBracket(bracketoffset) {
	context.beginPath();
	startpointW = canvas.width/2 - bracketoffset;
	startpointH = bracketbottomH;
	context.moveTo(startpointW,startpointH);
	context.lineTo(startpointW-10,startpointH);
	context.lineTo(startpointW-10,startpointH-50);
	context.lineTo(startpointW,startpointH-50);
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightBracket(bracketoffset){
	context.beginPath();
	startpointW = canvas.width/2 + bracketoffset;
	startpointH = bracketbottomH;
	context.moveTo(startpointW,startpointH);
	context.lineTo(startpointW+10,startpointH);
	context.lineTo(startpointW+10,startpointH-50);
	context.lineTo(startpointW,startpointH-50);
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawLeftLine(sidelineoffset){
	context.beginPath(); 
	context.moveTo((canvas.width/2)-bracketclamp,sidelineH);
	if (sidelineoffset > 0)
	{
		context.lineTo(canvas.width/2 - sidelineoffset,sidelineH);
	}
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(sidelineoffset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,sidelineH);
	if (sidelineoffset < canvas.width)
	{
		context.lineTo(canvas.width/2 + sidelineoffset,sidelineH);
	}
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(bottomlineoffset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,bracketbottomH);
	if (bottomlineoffset < canvas.height)
	{
		context.lineTo(canvas.width/2,bracketbottomH + bottomlineoffset);
	}
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate(offset) {
	offset = offset || 0;
	if (offset < bracketclamp)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawLeftBracket(offset);
		drawRightBracket(offset);
	}
	else
	{
		drawLeftLine(offset);
		drawRightLine(offset);
		drawBottomLine(offset);
	}
	requestAnimationFrame(function() {
		animate(offset+1);
	});
}

animate();