var tdtool = require('tdtool-js').tdtool();

var unitID = 1;			// The first device in the tellstick.conf file
var newValue = true;	// The new value true or false (on or off)

// Turns on or off an device by newValue true or false
tdtool.setTellstickUnitValue(function(err, data){
	console.log(data);
}, unitid, newValue); 
