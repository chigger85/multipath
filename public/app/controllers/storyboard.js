angular.module('quadCtrl', ['sentenceService'])

.controller('quadController', ["$scope", "Sentence", "$routeParams", function($scope, Sentence, $routeParams) {

	$scope.submitted = "";
	$scope.edit = false;
	$scope.sentences = {};
	$scope.origin_id = $routeParams.sentence_id;
	console.log($scope.origin_id);


	$scope.refresh = function() {



		Sentence.branch($scope.origin_id).success(function(data) {

			console.log(data)
			
				



		

		});
	}

	$scope.refresh();
	
	




}])