var should = require('should');
var recommendify = require('../lib/recommendify');
var matrix = require('../lib/inputMatrix');

describe('recommendify', function(){

	describe('Configuration', function(){
		it('Should return default maxNeighbors if not configured', function(){
			var mr = new recommendify.Base();

			should.exist(mr.defaults.maxNeighbors);
			mr.defaults.maxNeighbors.should.equal(50);
		});

		it('should remember max_neighbors if configured', function(){
			var mr = new recommendify.Base({
				maxNeighbors: 23
			});

			should.exist(mr.defaults.maxNeighbors);
			mr.defaults.maxNeighbors.should.equal(23);
		});

		it('should retrieve an input_matrix on a new instance', function(){
			recommendify.Base.inputMatrix('myinput', {similarityFunc: 'jaccard'});
			var mr = new recommendify.Base();

			mr.INPUT_MATRICES.myinput.should.exist
		});

		it('should add an input_matrix by key', function(){
			var input = null;
			var mr = new recommendify.Base();

			recommendify.Base.inputMatrix('myfirstinput', {similarityFunc: 'jaccard'});
			recommendify.Base.inputMatrix('mysecondinput', {similarityFunc: 'jaccard'});

			for(input in mr.INPUT_MATRICES) {
				input.should == 'myfirstinput';	
				input.should == 'mysecondinput';	
			}
			
		});

		it('should retrieve an input_matrix on a new instance and intialize the correct class', function(){
			recommendify.Base.inputMatrix('myinput', {similarityFunc: 'jaccard'});
			var mr = new recommendify.Base();

			mr.myinput.should.be.an.instanceof(matrix.JaccardInputMatrix)
		});
	});

	describe('Process item', function(){

		it('should call similarities_for on each input_matrix', function(){
			recommendify.Base.inputMatrix('myfirstinput', {similarityFunc: 'jaccard'});
			recommendify.Base.inputMatrix('mysecondinput', {similarityFunc: 'jaccard'});

			var mr = new recommendify.Base();

			//mr.myfirstinput.should_receive(:similarities_for).with('fnorditem').and_return([['fooitem',0.5]])
      		//mr.mysecondinput.should_receive(:similarities_for).with('fnorditem').and_return([['fooitem',0.5]])

      		//mr.similarity_matrix.stub!(:update)
      		mr.processItem('fnorditem')
		});

	});

});