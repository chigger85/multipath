angular.module('quadCtrl', [])


.controller('controller1', ["$scope", function($scope) {

	
	$scope.submitted = false;

	

	$scope.saveSentence = function(data) {


		$scope.submitted = !$scope.submitted;
		$scope.sentence = data;


	}

}])


.controller('controller2', ["$scope", function($scope) {

	
	$scope.submitted = false;

	

	$scope.saveSentence = function(data) {


		$scope.submitted = !$scope.submitted;
		$scope.sentence = data;


	}



}])

.controller('controller3', ["$scope", function($scope) {

	
	$scope.submitted = false;

	

	$scope.saveSentence = function(data) {


		$scope.submitted = !$scope.submitted;
		$scope.sentence = data;


	}



}])

.controller('controller4', ["$scope", function($scope) {

	
	$scope.submitted = false;

	

	$scope.saveSentence = function(data) {


		$scope.submitted = !$scope.submitted;
		$scope.sentence = data;


	}



}])









