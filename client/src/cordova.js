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


