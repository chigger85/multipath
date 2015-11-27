angular.module('quadCtrl', ['sentenceService'])

.controller('quadController', ["$scope", "Sentence", "$routeParams", function($scope, Sentence, $routeParams) {

	$scope.submitted = false;
	$scope.edit = false;
	$scope.sentenceData = {};

	$scope.origin_id = $routeParams.sentence_id;
	

	$scope.refresh = function(quad) {

		$scope.quad = quad;
		
		Sentence.branch($scope.origin_id, $scope.quad).success(function(data) {

			
			

		if (data.length > 0 ) {

			$scope.submitted = true;
			$scope.sentenceData = data[0];
			



			}	
		

		});


	}

	
   

	$scope.addSentence = function() {

		$scope.sentenceData.node = $scope.quad
		$scope.sentenceData.origin = $scope.origin_id
		$scope.sentenceData.start = false;


		Sentence.create($scope.sentenceData).success(function (data) {

				$scope.message = data.message
				$scope.sentenceData = data.posted

				$scope.submitted = true;
				
		})

	};


	$scope.editSentence = function(id) {

		$scope.submitted = false;
		$scope.edit = true;
		

		Sentence.get(id).success(function(data) {

			$scope.sentenceData = data;
			

		})


	};

	$scope.updateSentence = function() {

		

		Sentence.update($scope.sentenceData._id, $scope.sentenceData).success(function(data) {

			$scope.submitted = true;
			$scope.edit = false;
			

			
			
		})



	}

}])


