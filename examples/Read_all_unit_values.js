var tdtool = require('tdtool-js').tdtool();

// Returns the units value in an collection like below
// {id: 1, name: "Light 1", currentValue: false/true, currentDimValue: 0-255}
tdtool.readUnitsValue(function(tellstickValues){
	console.log(tellstickValues);
});