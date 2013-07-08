var tdtool = require('tdtool-js').tdtool();

var unitID = 1;			// The first device in the tellstick.conf file
var newValue = true;	// The new value 0-255 (0-100 %)

// Dim an device by newValue 0-255
tdtool.setTellstickUnitDimValue(function(err, data){
	console.log(data);
}, unitid, newValue); 
