function JaccardInputMatrix() {
	
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