var canvas = document.getElementById('ScreenCanvas');
if (canvas.getContext)
{
	var context = canvas.getContext('2d');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	context.beginPath(); 
	context.moveTo(canvas.width/2,canvas.height/2);
	context.lineTo((canvas.width/2)-5,canvas.height/2);
	context.lineTo((canvas.width/2)-5,(canvas.height/2)-20);
	context.lineTo((canvas.width/2),(canvas.height/2)-20);
	context.lineJoin = 'round';
	context.lineWidth = 1;
	context.strokeStyle = 'white';
	context.stroke();
}