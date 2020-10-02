var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

bracketstartpointW = canvas.width/2;
bracketstartpointH = canvas.height/6;
bracketH = 50;
stage1 = true;
stage2 = false;
stage3 = false;

function drawCenterLine(offset)
{
	context.beginPath();
	context.moveTo(bracketstartpointW,bracketstartpointH + offset);
	context.lineTo(bracketstartpointW,bracketstartpointH - offset);
	context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawTopLeftBracket(offset) {
	context.beginPath();
	currentbracketpointW = bracketstartpointW - offset;
  context.moveTo(currentbracketpointW,bracketstartpointH);
  context.lineTo(currentbracketpointW,bracketstartpointH - bracketH);
	context.lineTo(bracketstartpointW,bracketstartpointH - bracketH);
  context.lineJoin = 'round';
  context.lineWidth = 1;
  context.strokeStyle = 'black';
  context.stroke();
}

function drawBottomLeftBracket(offset) {
	context.beginPath();
	currentbracketpointW = bracketstartpointW - offset;
    context.moveTo(currentbracketpointW,bracketstartpointH);
    context.lineTo(currentbracketpointW,bracketstartpointH + bracketH);
	context.lineTo(bracketstartpointW,bracketstartpointH + bracketH);
    context.lineJoin = 'round';
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawTopRightBracket(offset) {
	context.beginPath();
	currentbracketpointW = bracketstartpointW + offset;
    context.moveTo(currentbracketpointW,bracketstartpointH);
    context.lineTo(currentbracketpointW,bracketstartpointH - bracketH);
	context.lineTo(bracketstartpointW,bracketstartpointH - bracketH);
    context.lineJoin = 'round';
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawBottomRightBracket(offset) {
	context.beginPath();
	currentbracketpointW = bracketstartpointW + offset;
    context.moveTo(currentbracketpointW,bracketstartpointH);
    context.lineTo(currentbracketpointW,bracketstartpointH + bracketH);
	context.lineTo(bracketstartpointW,bracketstartpointH + bracketH);
    context.lineJoin = 'round';
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawLeftLine(offset){
	context.beginPath();
	context.moveTo(canvas.width/2,bracketstartpointH);
	context.lineTo(canvas.width/2 - offset,bracketstartpointH);
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(offset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,bracketstartpointH);
	context.lineTo(canvas.width/2 + offset,bracketstartpointH);
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(offset){
	context.beginPath(); 
	context.moveTo(canvas.width/2,bracketstartpointH);
	context.lineTo(canvas.width/2,bracketstartpointH + offset);
	context.lineWidth = 0.5;
	context.strokeStyle = 'black';
	context.stroke();
}

function animate(offset) {
  offset = offset || 0;
	if (stage1)
	{
		if (offset < bracketH)
		{
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawCenterLine(offset);
		}
		else
		{
      offset = 0;
			stage2 = true;
			stage1 = false;
		}
	}
	else
	{
		if (stage2)
		{
			if (offset < 300)
			{
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawTopLeftBracket(offset);
				drawBottomLeftBracket(offset);
				drawTopRightBracket(offset);
				drawBottomRightBracket(offset);
			}
			else
			{
				stage3 = true;
				stage2 = false;
			}
		}
	}
	requestAnimationFrame(function() {
		animate(offset + 1);
	});
}

animate();