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
			],
			directionIndex,
			facing,
			degrees;

		if(alpha === null || isNaN(alpha)) {
			return;
		}


		degrees = Math.round(apha);
		directionIndex = Math.floor(alpha / 45);
		
		facing = directions[directionIndex];
		
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