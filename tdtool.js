var sys = require('sys');
var exec = require('child_process').exec;
var child;
  
 // Current device setup befor implementation of SQLite database
 /*
var units = [ 
    { device : "F"+unescape("%F6")+"nsterlampa i kontoret", unitAdress : 1, currentValue : false }, 
    { device : "Trapstegsljus", unitAdress : 2, currentValue : false }, 
    { device : "F"+unescape("%F6")+"nsterlampor i vardagsrummet", unitAdress : 3, currentValue : false }, 
    { device : "Lampor p"+unescape("%E5")+" inneg"+unescape("%E5")+"rd", unitAdress : 4, currentValue : false }, 
    { device : "F"+unescape("%F6")+"nsterlampa i k"+unescape("%F6")+"ket", unitAdress : 5, currentValue : false }, 
    { device : "Bordslampa i hallen", unitAdress : 6, currentValue : false }, 
    { device : "F"+unescape("%F6")+"nsterlampa i sovrum", unitAdress : 7, currentValue : false }, 
  ]; */

var debug = false;

function tdtool () {
	if (arguments.callee._singletonInstance){
 		return arguments.callee._singletonInstance;
	}
 	arguments.callee._singletonInstance = this;

	this.readUnitsValue = function(callback){
	  var values = [];

	  // Not yet implemented
	  // Read data from the tdtool -l command and format it as the unit data object
	  if(!debug){
	    var str = "tdtool -l";
	    child = exec(str, function (error, stdout, stderr) {
	      if (error !== null) {
	        console.log('exec error: ' + error);
	        callback();
	      }else{
	        var index = 1;
	        var strings = stdout.split('\n');

	        for (var i = 1; i<strings.length; i++) {
	          // String not empty
	          if(strings[i-1] != ""){ 
	              var parts = strings[i-1].split('\t'); 

	              // Check that row has right syntax
	              if(parts.length >= 3){ 

	              	// Check if value is ok
	              	var value = new Object();
					value.id = index;
		            value.name = parts[1];
		            value.currentValue = false;
					value.currentDimValue = 255;

	              	if(parts[2] == "ON"){
	              	  	value.currentValue = true;
						value.currentDimValue = 255;
		            }else if(parts[2] == "OFF"){
	              	  	value.currentValue = false;
						value.currentDimValue = 255;
		            }else{
		            	var dim = parts[2].split(':');
		            	if(dim.length >= 1){
		            		value.currentValue = true;
							value.currentDimValue = dim[1];
		            	}
		            }

		            values.push(value);

		            index++;
		          }  
	          } 
	        }
	        callback(values);
	      }
		});
	  }else{
	    callback(values);
	  }
	}

	this.setTellstickUnitValue = function(callback, unitId, value, id, units){
	  var units = units;
	  // Not yet implemented
	  // Set device state with the tdtool --on 'unit' command
	  if(!debug){
	    var str = "tdtool ";

	    if(value){
	      str = str + "--on " + unitId;
	    }else{
	      str = str + "--off " + unitId;
	    }

	    child = exec(str, function (error, stdout, stderr) {
	      if (error !== null) {
	        console.log('exec error: ' + error);
	        callback();
	      }else{
	        // Should be removed when the list of devices is
	        // generated 
	        units[id].currentValue = value;
	        //
	        callback();
	      }
	    });
	  }else{

	    units[id].currentValue = value;

	    callback();
	  }
	}

	this.setTellstickUnitDimValue = function(callback, unitId, value, id, units){
	  var units = units;
	  // Not yet implemented
	  // Set device state with the tdtool --on 'unit' command
	  if(!debug){
	    var str = "tdtool ";


	     str = str + "-v " + value + " -d " + unitId;


	    child = exec(str, function (error, stdout, stderr) {
	      if (error !== null) {
	        console.log('exec error: ' + error);
	        callback();
	      }else{
	        // Should be removed when the list of devices is
	        // generated 
	        units[id].currentValue = true;
	        units[id].currentDimValue = value;
	        //
	        callback();
	      }
	    });
	  }else{
	  	
	  	units[id].currentValue = true;
	    units[id].currentDimValue = value;

	    callback();
	  }
	}
 }
 
tdtool();
exports.tdtool = tdtool;