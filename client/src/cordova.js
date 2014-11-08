// Empty file to avoid download error.
// cordova.js is internally provided by cordova cli at compile time.

// Testing stuff...

if (navigator.notification === undefined) navigator.notification = {};
navigator.notification.confirm = function cordovaConfirm(message, confirmCallback, title, buttonLabels) {
	if (window.confirm(message)) {
		confirmCallback(2);
	} else {
		confirmCallback(1);
	};
};

if (navigator.geolocation === undefined) navigator.geolocation = {};
navigator.geolocation.getCurrentPosition = function cordovaGetCurrentPosition(
	geolocationSuccess
) {
	geolocationSuccess({
		coords: {
			latitude: "lat",
			longitude: "long",
			altitude: "alt",
			accuracy: "acc",
			altitudeAccuracy: "altAcc",
			heading: "heading",
			speed: "speed",
		},
		timestamp: "timestamp",
	});
};


