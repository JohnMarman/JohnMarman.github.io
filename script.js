var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}

a=0;
var txt = 'John Marman';
bracketstartpointW = Math.round(canvas.width/2) - 0.5;
bracketstartpointH = Math.round(canvas.height/6) + 0.5;
bracketH = 50;
bracketDistance = 300;
bottomlinestartpoint = bracketstartpointH + bracketH;
linedistance = 2000;
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
  linestartpointW = bracketstartpointW - bracketDistance;
	context.moveTo(linestartpointW,bracketstartpointH);
	context.lineTo(linestartpointW - offset,bracketstartpointH);
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawRightLine(offset){
	context.beginPath(); 
  linestartpointW = bracketstartpointW + bracketDistance;
	context.moveTo(linestartpointW,bracketstartpointH);
	context.lineTo(linestartpointW + offset,bracketstartpointH);
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawBottomLine(offset){
	context.beginPath();
	context.moveTo(bracketstartpointW,bottomlinestartpoint);
	context.lineTo(bracketstartpointW,bottomlinestartpoint + offset);
	context.lineWidth = 1;
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
  if (stage2)
  {
    if (offset < bracketDistance)
    {
      context.clearRect(0, 0, canvas.width, canvas.height);
      typeWriter();
      drawTopLeftBracket(offset);
      drawBottomLeftBracket(offset);
      drawTopRightBracket(offset);
      drawBottomRightBracket(offset);
    }
    else
    {
      offset = 0;
      stage3 = true;
      stage2 = false;
    }
  }
	if (stage3)
   {
     if (offset < linedistance)
      {
        drawLeftLine(offset);
        drawRightLine(offset);
        drawBottomLine(offset);
      }
	
   }
	requestAnimationFrame(function() {
		animate(offset + 1);
	});
}

var newStyles = document.createElement('style')
document.head.append(newStyles)
newStyles.innerHTML = ".my-element {" +
  "top: " + bracketstartpointH + "px;" +
  "left: " + bracketstartpointW + "px;"
"}"


function typeWriter() {
  if (a < txt.length) {
    document.getElementById("name").innerHTML += txt.charAt(a);
    a++;
  }
}

animate();
typeWriter();