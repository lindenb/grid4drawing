/** Author : Pierre Lindenbaum */

var theImage = null;
var doRotate=false;
var doScale=1.0;
var lastMouse = null;
var gTranslate = {"x":0,"y":0};

function message(color,str) {
 	var E1 = document.getElementById("message");
 	while (E1.firstChild) E1.removeChild(E1.firstChild);
 	E1.setAttribute("style","color:"+color+";");
	E1.appendChild(document.createTextNode(str));
	}

function drawImage() {
	
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth * doScale;
    canvas.height = window.innerHeight * doScale;
    
    var ctx = canvas.getContext('2d');
	if(theImage!= null)
		{
		ctx.save();
		ctx.translate(gTranslate.x,gTranslate.y);
		if(doRotate)
			{
			ctx.rotate(Math.PI / 2.0);
		 	var factor= doScale * Math.min(canvas.width/theImage.height,canvas.height/theImage.width);
		 	ctx.scale(factor,factor);
			ctx.drawImage(theImage,0, -theImage.height);
			}
		else
			{
		 	var factor=doScale * Math.min(canvas.width/theImage.width,canvas.height/theImage.height);
		 	ctx.scale(factor,factor);
			ctx.drawImage(theImage,0, 0);
			}
		ctx.restore();	
		}
	ctx.globalCompositeOperation="xor";//default is 'source-over'
	ctx.strokeStyle="black";
	var gridstep = parseInt(document.getElementById("grid").value);

	var gridstep3 = gridstep*3;
	for(var y=0;y<=canvas.height;y+=gridstep)
		{
		ctx.lineWidth=y%gridstep3==0?0.5:0.25;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width,y);
		ctx.stroke(); 
		}
	for(var x=0;x<=canvas.width;x+=gridstep)
		{
		ctx.lineWidth=x%gridstep3==0?0.5:0.25;
		ctx.beginPath();
		ctx.moveTo(x,0);
		ctx.lineTo(x,canvas.height);
		ctx.stroke(); 
		}
	}

function urlChanged() {
	theImage = null;
	var E1 = document.getElementById("url");
	if(E1.value.trim().length == 0) return;
 	theImage = new Image();
	theImage.src = url.value;
	theImage.onload = function () {
	 	message("black","");
	 	drawImage();
	 	};
	theImage.onerror = function () { 
		 message("red","Cannot load Image");
		 theImage = null;
	 	 };
	}

window.addEventListener('load', function() {
 	var E1 = document.getElementById("url");
	 E1.addEventListener("change",function() {
		urlChanged();
		});
	E1 = document.getElementById("grid");
	E1.addEventListener("change",function() {
		document.getElementById("grid").setAttribute("title","grid size:"+document.getElementById("grid").value);
		drawImage();
		});
	E1 = document.getElementById("rotate");
	E1.addEventListener("click",function() {
		doRotate = !doRotate;
		drawImage();
		});
   document.getElementById("zoomin").addEventListener("click",function() {
		doScale = doScale*1.1;
		drawImage();
		});
   document.getElementById("zoomout").addEventListener("click",function() {
		doScale = doScale*0.9;
		drawImage();
		});
	var dragListener = function(evt) {
		if(lastMouse!=null)
			{
			gTranslate.x += evt.screenX - lastMouse.x;
			gTranslate.y += evt.screenY - lastMouse.y;
			drawImage();
			lastMouse={"x":evt.screenX,"y":evt.screenY};
			}
		
		evt.preventDefault();
		};
	
	var canvas = document.getElementById('canvas');
	canvas.addEventListener("mousedown",function(evt) {
		evt.preventDefault();
		lastMouse={"x":evt.screenX,"y":evt.screenY};
		//drawImage();
		});
	canvas.addEventListener("mousemove",dragListener);
	
	var endDragListener = function(evt) {
		evt.preventDefault();
		lastMouse = null;
		//canvas.removeEventListener(dragListener); TODO
		};
	canvas.addEventListener("mouseup",endDragListener);
	canvas.addEventListener("mouseout",endDragListener);
	
	document.addEventListener("mousemove",function(evt) {
		document.getElementById('top').style.display=(evt.y <50?"block":"none");	
		});
	
	urlChanged();
	});

