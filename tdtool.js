var sys = require('sys');
var exec = require('child_process').exec;
var child;
  
var debug = false;

function tdtool () {
	if (arguments.callee._singletonInstance){
 		return arguments.callee._singletonInstance;
	}
 	arguments.callee._singletonInstance = this;

 	// Returns the units value in an collection like below
 	// {id: 1, name: "Light 1", currentValue: false/true, currentDimValue: 0-255}
	this.readUnitsValue = function(callback){
	  var values = [];

	  // Not yet implemented
	  // Read data from the tdtool -l command and format it as the unit data object
	  if(!debug){
	  	if(process.platform === 'linux'){
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
			callback(null);
		}
	  }else{
	    callback(values);
	  }
	}

	this.setTellstickUnitValue = function(callback, unitId, value){
	  var units = units;
	  // Not yet implemented
	  // Set device state with the tdtool --on 'unit' command
	  if(!debug){
	  	if(process.platform === 'linux'){
		    var str = "tdtool ";

		    if(value){
		      str = str + "--on " + unitId;
		    }else{
		      str = str + "--off " + unitId;
		    }

		    child = exec(str, function (error, stdout, stderr) {
		      if (error !== null) {
		        console.log('exec error: ' + error);
		        callback(error, stdout);
		      }else{ 
		        callback(null, stdout);
		      }
		    });
		}else{
			callback(null, "Not an linux computor");
		}
	  }else{

	    callback();
	  }
	}

	this.setTellstickUnitDimValue = function(callback, unitId, value){
	  var units = units;
	  // Not yet implemented
	  // Set device state with the tdtool --on 'unit' command
	  if(!debug){
	  	if(process.platform === 'linux'){
		    var str = "tdtool ";


		     str = str + "-v " + value + " -d " + unitId;


		    child = exec(str, function (error, stdout, stderr) {
		      if (error !== null) {
		        console.log('exec error: ' + error);
		        callback(error, stdout);
		      }else{

		        callback(null, stdout);
		      }
		    });
		}else{
			callback(null, "Not an linux computor");	
		}
	  }else{

	    callback();
	  }
	}
 }
 
tdtool();
exports.tdtool = tdtool;
