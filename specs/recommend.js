var should = require('should');
var recommend = require('../lib/recommend');
var matrix = require('../lib/inputMatrix');

describe('Recommend', function(){

	describe('Configuration', function(){
		it('Should return default maxNeighbors if not configured', function(){
			var mr = new recommend.Base();

			should.exist(mr.defaults.maxNeighbors);
			mr.defaults.maxNeighbors.should.equal(50);
		});

		it('should remember max_neighbors if configured', function(){
			var mr = new recommend.Base({
				maxNeighbors: 23
			});

			should.exist(mr.defaults.maxNeighbors);
			mr.defaults.maxNeighbors.should.equal(23);
		});

		it('should retrieve an input_matrix on a new instance', function(){
			recommend.Base.inputMatrix('myinput', {similarityFunc: 'jaccard'});
			var mr = new recommend.Base();

			mr.INPUT_MATRICES.myinput.should.exist
		});

		it('should add an input_matrix by key', function(){
			var input = null;
			var mr = new recommend.Base();

			recommend.Base.inputMatrix('myfirstinput', {similarityFunc: 'jaccard'});
			recommend.Base.inputMatrix('mysecondinput', {similarityFunc: 'jaccard'});

			for(input in mr.INPUT_MATRICES) {
				input.should == 'myfirstinput';	
				input.should == 'mysecondinput';	
			}
			
		});

		it('should retrieve an input_matrix on a new instance and intialize the correct class', function(){
			recommend.Base.inputMatrix('myinput', {similarityFunc: 'jaccard'});
			var mr = new recommend.Base();

			mr.myinput.should.be.an.instanceof(matrix.JaccardInputMatrix)
		});
	});

});