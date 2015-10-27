function Clock(settings){
	settings.radius = settings.radius || 100;
	settings.secondPinPadding = settings.secondPinPadding || 5;
	settings.minutePinPadding = settings.minutePinPadding || 10;
	settings.hourPinPadding = settings.hourPinPadding || 15;
	settings.clockPlateEdgeWidth = settings.clockPlateEdgeWidth || 10;
	settings.hourMarkLength = settings.hourMarkLength || 10;
	settings.minuteMarkLength = settings.minuteMarkLength || 5;
	this.clockCanvas = document.createElement("canvas");
	if(settings.id){
		this.clockCanvas.id = settings.id;
	}
	if(settings.className){
		this.clockCanvas.className = settings.className;
	}
	this.clockCanvas.width=this.clockCanvas.height=2*settings.radius;
	this.drawClock(settings);
}

Clock.prototype={
	constructor:Clock,
	attach:function(container){
		container = container || document.body
		container.appendChild(this.clockCanvas);
	},
	
	destroy:function(){
		if(this.clockCanvas && this.clockCanvas.timer){
			clearInterval(this.clockCanvas.timer);
		}
	},
	
	drawClock:function(settings){
		if(!this.clockCanvas || !this.clockCanvas.getContext){
			return;
		}
		var context = this.clockCanvas.getContext("2d");
       		
		var drawer = function(){
		   var width = 2*settings.radius;
		   context.clearRect(0,0,width,width);
		   Clock.prototype.drawClockPlate(context,settings);
		   Clock.prototype.drawPin(context,settings);
		}
		this.clockCanvas.timer = window.setInterval(drawer,200);
	},
	
	drawClockPlate:function(context,settings){
		context.save();
		context.beginPath();
		
		var outterRadius = settings.radius;
		var innerRadius = outterRadius - settings.clockPlateEdgeWidth;
		
		context.translate(outterRadius,outterRadius);
		
		context.arc(0,0,outterRadius,0,Math.PI*2,false);
		context.moveTo(innerRadius,0);
		context.arc(0,0,innerRadius,0,Math.PI*2,false);
		
		var hourMarkPos=innerRadius-settings.hourMarkLength;
		var minuteMarkPos=innerRadius-settings.minuteMarkLength;
		context.textAlign="center";
		context.textBaseline="top";
		context.fillText("12",0,-hourMarkPos);
		
		context.textAlign="end";
		context.textBaseline="middle";
		context.fillText("3",hourMarkPos,0);
		
		context.textAlign="center";
		context.textBaseline="bottom";
		context.fillText("6",0,hourMarkPos);
		
		context.textAlign="start"
		context.textBaseline="middle";
		context.fillText("9",-hourMarkPos,0);
		
		context.moveTo(0,-hourMarkPos);
		context.lineTo(0,-innerRadius);
		
		context.moveTo(hourMarkPos,0);
		context.lineTo(innerRadius,0);
		
		context.moveTo(0,hourMarkPos);
		context.lineTo(0,innerRadius);
		
		context.moveTo(-hourMarkPos,0);
		context.lineTo(-innerRadius,0);
		
		for(var i=1;i<=60;i++){
		   context.moveTo(0,-minuteMarkPos);
		   context.lineTo(0,-innerRadius);
		   context.rotate(2*Math.PI/60);
		}
		
		context.stroke();
		context.restore();
	},
	
	drawPin:function(context,settings){
		var outterRadius = settings.radius;
		var innerRadius = outterRadius - settings.clockPlateEdgeWidth;
		
		context.save();
		context.beginPath();
		
		var outterRadius = settings.radius;
		var innerRadius = outterRadius - settings.clockPlateEdgeWidth;
		
		context.translate(outterRadius,outterRadius);
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		var seconds= now.getSeconds();
		
		context.save();
		context.moveTo(0,0);
		var hourDegree = 2*Math.PI*(hours%12+minutes/60)/12;
		context.rotate(hourDegree);
		var hourPinLength = innerRadius - settings.hourPinPadding;
		context.moveTo(0,0);
		context.lineTo(0,-hourPinLength);
		
		context.restore();
		context.save();
		var minutesDegree = 2*Math.PI*(minutes+seconds/60)/60;
		context.rotate(minutesDegree);
		var minutePinLength = innerRadius - settings.minutePinPadding;
		context.moveTo(0,0);
		context.lineTo(0,-minutePinLength);
		
		context.restore();
		context.save();
		var secondDegree = 2*Math.PI*seconds/60;
		context.rotate(secondDegree);
		var secondPinLength=innerRadius-settings.secondPinPadding;
		context.moveTo(0,0);
		context.lineTo(0,-secondPinLength);
		context.restore();
		
		context.stroke();
		context.restore();
	}
}