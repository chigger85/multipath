angular.module('quadCtrl', ['sentenceService'])


.controller('controller0', ['$scope',  "$routeParams", "Sentence", function($scope, $routeParams, Sentence) {



	$scope.submitted = "";
	$scope.edit = false;
	$scope.sentenceData = {};

	


	var refresh = function() {

	

		Sentence.all().success(function(data) {

			console.log(data.length)

			if (data.length > 0) {

				$scope.submitted = true;
				$scope.sentenceData =  data[0];
				$scope.sentence_id = data[0]._id;



			}


			console.log($scope.submitted)
		});
	}

	refresh();



	

	$scope.firstSentence = function() {


		$scope.message =  '';

		Sentence.create($scope.sentenceData).success(function (data) {

			$scope.message = data.message

			refresh();


		});
	} 


	$scope.editSentence = function(id) {

		$scope.submitted = false;
		$scope.edit = true;

		Sentence.get(id).success(function(data) {

			$scope.sentenceData = data;

		})



	}

	$scope.updateSentence = function() {

		

		Sentence.update($scope.sentence_id, $scope.sentenceData).success(function(data) {

			refresh();
			$scope.edit = false;
			
		})



	}






}]);