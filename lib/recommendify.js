var _ = require('underscore')._;
var matrix = require('../lib/inputMatrix');

var INPUT_MATRICES = {};

function Base(options){
	var self = this;

	this.defaults = _.extend({
		maxNeighbors: 50
	}, options);

	this.INPUT_MATRICES = INPUT_MATRICES;

	_.each(this.INPUT_MATRICES, function(opts, input){
		self[input] = new matrix.InputMatrix().create(opts);
	});
}

Base.prototype.processItem = function(itemId) {
	_.map(INPUT_MATRICES, function(matrix, input){
		//console.log(matrix, input)
		//var neighbors = _.map(m.similaritiesFor(item_id), function(matrix, input){ return i,w*m.weight };
	});
};

Base.inputMatrix = function(key, options) {
	INPUT_MATRICES[key] = options;
};


module.exports.Base = Base;