var CCMatrix = require('../lib/CCMatrix').CCMatrix;

function JaccardInputMatrix() {
	this.ccmatrix = new CCMatrix();
}

JaccardInputMatrix.prototype.similaritiesFor = function(item1) {
	calculateSimilarities(item1)
}

JaccardInputMatrix.prototype.calculateSimilarities = function(item1) {
	var allItems = this.ccmatrix.allItems();
}

function InputMatrix() {

}

InputMatrix.prototype.create = function(opts, input) {
	switch(opts.similarityFunc){
		case 'jaccard':
			return new JaccardInputMatrix();
			break;
		default:
			return new JaccardInputMatrix();
	};
};

module.exports.InputMatrix = InputMatrix;
module.exports.JaccardInputMatrix = JaccardInputMatrix;