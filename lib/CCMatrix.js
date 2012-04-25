var redis = require('redis').createClient();

function CCMatrix() {
	return {
		allItems: function(first_argument) {
			redis.hkeys(':items', function(err, reply){
		    	//console.log(reply)
		  	});	
		}
	}
}

module.exports.CCMatrix = CCMatrix;