var trace = function(msg){ console.log(msg); };

var preloader;
var timeData;
var clock;
var enterFrame;

function time_init(event)
{
	trace(this);

	preloader = document.querySelector(".preloader");

	timeData 						= {};
	timeData.data 			= new Date(Date.now());
	timeData.read 			= {};
	timeData.read.h 		= timeData.data.getHours();
	timeData.read.m 		= timeData.data.getMinutes();
	timeData.read.s 		= timeData.data.getSeconds();
	timeData.current 		= {};
	timeData.current.h	= 0;
	timeData.current.m	= 0;
	timeData.current.s 	= 0;

	clock 									= {};
	clock.hour 							= {};
	clock.mins 							= {};
	clock.secs 							= {};
	clock.handHour					=	document.querySelector("#display .timeBarsH");
	clock.handMins					= document.querySelector("#display .timeBarsM");

	clock.hour.gfxH 				= clock.handHour.querySelector(".unitWrapper .hourBar");
	clock.hour.gfxM 				= clock.handMins.querySelector(".unitWrapper .hourBar");
	clock.hour.percentage 	= 100 / 24;
	clock.hour.rotateCirc 	= 360 / 12;

	clock.mins.gfxH 				= clock.handHour.querySelector(".unitWrapper .minsBar");
	clock.mins.gfxM 				= clock.handMins.querySelector(".unitWrapper .minsBar");
	clock.mins.percentage 	= 100 / 60;
	clock.mins.rotateCirc 	= 360 / 60;

	clock.secs.gfxH 				= clock.handHour.querySelector(".unitWrapper .secsBar");
	clock.secs.gfxM 				= clock.handMins.querySelector(".unitWrapper .secsBar");
	clock.secs.percentage 	= 100 / 60;

	enterFrame = {};
	enterFrame.instance = null;
	enterFrame.loop = false;

	// START LOOP
	enterFrame_init(true);
}

function enterFrame_init(run)
{
	if(run)
	{
		enterFrame.loop = true;
		enterFrame.instance = window.requestAnimationFrame(enterFrame_loop);
	}

	else
	{
		enterFrame.loop = false;
		window.cancelAnimationFrame(enterFrame.instance);
	}
}

function enterFrame_loop()
{
	timeData.data = new Date(Date.now());

	timeData.read.h = timeData.data.getHours();
	timeData.read.m = timeData.data.getMinutes();
	timeData.read.s = timeData.data.getSeconds();

	// SECOND UPDATE
	if(timeData.read.s != timeData.current.s)
	{
		time_check();
	}

	// REFRESH
	if(enterFrame.loop)
	{
		enterFrame.instance = window.requestAnimationFrame(enterFrame_loop);
	}
}

function time_check()
{
	var amend = false;
	var convert_hour;
	var transformString_h = "";
	var transformString_m = "";
	var transformString_s = "";

	// HOUR
	if(timeData.read.h != timeData.current.h)
	{
		if(timeData.read.h > 12)
		{
			convert_hour = Math.abs(timeData.read.h - 12);
		}

		else
		{
			convert_hour = timeData.read.h;
		}

		trace("HOUR CHECK === " + convert_hour);

		clock.handHour.style.transform = "rotate(" + (convert_hour * clock.hour.rotateCirc) + "deg)";


		clock.hour.gfxH.style.transform = "scaleY(" + (timeData.read.h * clock.hour.percentage) / 100 + ")";
		clock.hour.gfxM.style.transform = "scaleY(" + (timeData.read.h * clock.hour.percentage) / 100 + ")";

		timeData.current.h = timeData.read.h;
	}

	// MINS
	if(timeData.read.m != timeData.current.m)
	{
		clock.handMins.style.transform = "rotate(" + (timeData.read.m * clock.mins.rotateCirc) + "deg)";

		clock.mins.gfxH.style.transform = "scaleY(" + (timeData.read.m * clock.mins.percentage) / 100 + ")";
		clock.mins.gfxM.style.transform = "scaleY(" + (timeData.read.m * clock.mins.percentage) / 100 + ")";

		timeData.current.m = timeData.read.m;
	}

	// SECS
	if(timeData.read.s != timeData.current.s)
	{
		clock.secs.gfxH.style.transform = "scaleY(" + (timeData.read.s * clock.secs.percentage) / 100 + ")";
		clock.secs.gfxM.style.transform = "scaleY(" + (timeData.read.s * clock.secs.percentage) / 100 + ")";

		timeData.current.s = timeData.read.s;
	}
}

function preload_remove()
{
	clock.gfx.classList.add("time-tween");

	preloader.addEventListener("transitionend", preload_remove_event, false);
	preloader.style.transform = "translateX(-100%)";
}

function preload_remove_event(event)
{
	preloader.removeEventListener("transitionend", preload_remove_event, false);
	preloader.remove();
	preloader = null;
}