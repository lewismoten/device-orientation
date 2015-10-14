(function webGraphicsLibraryDemo(){

	'use strict';

	window.onload = main;

	var data = {

		orientation: {
			supported: undefined
		},

		motion: {
			supported: undefined
		}

	};

	return;

	function main() {

		data.orientation.supported = canUseDeviceOrientation();
		data.motion.supported = canUseDeviceMotion();

		if(data.orientation.supported) {

			window.addEventListener('deviceorientation', onDeviceOrientation, false);

		}

		if(data.motion.supported) {

			window.addEventListener('devicemotion', onDeviceMotion, false);

		}
	}

	function displayData() {

		displayValues('data', data);

	}

	function displayValues(idPrefix, source) {

		var key,
			id,
			value;

		for(var key in source) {

			id = idPrefix + '.' + key;
			value = source[key];

			if(typeof value === 'object' && value !== null) {
				displayValues(id, value);
			}
			else {
				setValue(id, value);
			}
		}

	}

	function setValue(id, value) {
		var element = document.getElementById(id);
		if(element === null) {
			// console.log('not found', id);
			return;
		};
		element.innerText = value;

	}
	function canUseDeviceOrientation() {
		return typeof window.DeviceOrientationEvent !== 'undefined';
	}

	function canUseDeviceMotion() {
		return typeof window.DeviceMotionEvent !== 'undefined';
	}

	function onDeviceOrientation(event) {

		var orientation = data.orientation,
			alpha = event.alpha;

		orientation.alpha 		= event.alpha;
		orientation.beta		= event.beta;
		orientation.gamma 		= event.gamma;
		orientation.absolute 	= event.absolute;

		data.compass = getCompass(event);

		displayData();

	}

	function getCompass(orientation) {

		var alpha = orientation.alpha,
			directions =  [
			'North', 
			'North East',
			'East',
			'South East',
			'South',
			'South West',
			'West',
			'North West'			
			];

		if(alpha === null || isNaN(alpha)) {
			return;
		}

		var headingSize = 360 / directions.length,
			degrees = Math.floor(alpha),
			offset = headingSize / 2,
			offsetDegrees = degrees + offset,
			cappedDegrees = (360 + offsetDegrees) % 360,
			directionIndex = Math.floor(cappedDegrees / headingSize),
			facing = directions[directionIndex];

		// console.log({
		// 	headingSize: headingSize,
		// 	degrees: degrees,
		// 	offset: offset,
		// 	offsetDegrees: offsetDegrees,
		// 	cappedDegrees: cappedDegrees,
		// 	directionIndex: directionIndex,
		// 	facing: facing

		// });
		// n: 0    -22.5 - 22.5
		// ne: 45   22.5 - 67.5
		// e: 90    67.5 - 112.5
		// se:     112.5 - 157.5
		// s: 180  157.5 - 202.5
		// sw:     202.5 - 247.5
		// w: 270  247.5 - 292.5
		// nw:     292.5 - 337.5
		
		return {
			facing: facing,
			degrees: degrees
		}
	}

	function onDeviceMotion(event) {

		var motion = data.motion;

		motion.acceleration 				= event.acceleration;
		motion.interval 					= event.interval;
		motion.accelerationIncludingGravity = event.accelerationIncludingGravity;
		motion.rotationRate 				= event.rotationRate;

		displayData();

	}

})();