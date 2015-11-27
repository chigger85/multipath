angular.module('mainCtrl', ['sentenceService']) 


.controller('mainController', ["$location", "Sentence", "$routeParams", function($location, Sentence, $routeParams) {

	var vm  = this;


	vm.submitted = false;
	vm.edit = false;
	vm.origin = false;
	vm.sentenceData = {};


	vm.refresh = function() {

		

		Sentence.all().success(function(data) {

			if (data.length == 0) {

				vm.start = true;
				vm.sentenceData = {};
				vm.submitted = false;
				vm.setOrigin = true;
				$location.path('/')
				

			}	


			else if  (!$routeParams.sentence_id && data.length > 0) {

				vm.start = true;

				vm.submitted = true;
				vm.setOrigin = false;

				Sentence.first().success(function(data) {

					vm.sentenceData = data[0];
					vm.firstId = data[0]._id;
					$location.path('/'+vm.sentenceData._id);

				})
				
			}

					
			else if ($routeParams.sentence_id == vm.firstId) {

				vm.start = true;
			}
		

			else if ($routeParams.sentence_id && $routeParams.sentence_id !== vm.firstId ) {

				vm.start = false;
				vm.submitted = true;
				vm.setOrigin = false;
				Sentence.get($routeParams.sentence_id).success(function(data) {

					vm.sentenceData = data;
				})

			}
			
		});

		
	};

	vm.refresh();
	


	vm.deleteAll = function() {

		Sentence.deleteAll().success(function(data) {

			$location.path('/');
			vm.refresh();
		

		})
	}
	




	

	vm.addSentence = function() {


		vm.message =  '';
		vm.sentenceData.start = vm.setOrigin
		vm.sentenceData.origin = null;
		
		

		Sentence.create(vm.sentenceData).success(function (data) {

			vm.message = data.message
			vm.sentenceData = data.posted
			

			vm.refresh()



		});

			
	} 


	vm.editSentence = function(id) {

		
		vm.edit = true;
		vm.submitted = false;
		
		

		Sentence.get(id).success(function(data) {

			vm.sentenceData = data;
			

		})


	}


	vm.updateSentence = function(id,content) {

		

		Sentence.update(id, content).success(function(data) {

			vm.submitted = true;
			vm.edit = false;
			vm.refresh();

			
			
		})



	}








}]);