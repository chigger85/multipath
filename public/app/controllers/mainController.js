angular.module('mainCtrl', ['sentenceService'])


.controller('mainController', ['$scope',  "$location", "Sentence", function($scope, $location, Sentence) {

	var vm  = this;

	vm.submitted = false;
	vm.edit = false;
	vm.origin = false;
	
	


	vm.refresh = function() {

	

		Sentence.all().success(function(data) {

		


			if (data.length > 0) {

				vm.submitted = true;
				vm.sentenceData = data[0];
				$location.path('/'+data[0]._id)

				

			}

			if (data == 0) {

				vm.submitted = false;
				vm.setOrigin = true;
				

			}

		



			
		});
	}

	vm.refresh();



	

	vm.addSentence = function() {


		vm.message =  '';
		vm.sentenceData.start = vm.setOrigin
		vm.sentenceData.origin = null;
		
		

		Sentence.create(vm.sentenceData).success(function (data) {

			vm.message = data.message
			vm.sentenceData = data.posted
			
			$location.path('/'+data.posted._id)


			


		});

		vm.refresh()	
	} 


	vm.editSentence = function(id) {

		vm.submitted = false;
		vm.edit = true;
		

		Sentence.get(id).success(function(data) {

			vm.sentenceData = data;
			

		})



	}

	vm.updateSentence = function() {

		

		

		Sentence.update(vm.sentenceData._id, vm.sentenceData).success(function(data) {

			vm.submitted = true;
			vm.edit = false;
			vm.refresh();

			
			
		})



	}








}]);