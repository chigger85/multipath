angular.module('mainCtrl', ['sentenceService']) 

.run( ["$rootScope", "$location", function($rootScope, $location) {
   $rootScope.$watch(function() { 
      return $location.path(); 
    },
    function(a){  
      console.log('url has changed: ' + a);
      // show loading div, etc...
    });
}])

.controller('mainController', ["$location", "Sentence", "$routeParams", function($location, Sentence, $routeParams) {

	var vm  = this;


	vm.submitted = false;
	vm.edit = false;
	vm.origin = false;
	vm.sentenceData = {};


	vm.refresh = function() {

		// Sentence.first().success(function(data) {

		// 			if(data) {vm.firstId = data[0]._id};
					

		// 		})


		

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
				Sentence.first().success(function(data) {

					vm.sentenceData = data[0];
					vm.firstId = data[0]._id;
	

				})
			}
		

			else if ($routeParams.sentence_id !== vm.firstId ) {

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



angular.module('sentenceService', [])

.factory('Sentence', ["$http", function($http) {

	var sentenceFactory = {};

	sentenceFactory.get = function(id) {

		return $http.get('/api/sentences/' + id);
	};


	// get all sentences

	sentenceFactory.all = function() {

		return $http.get('/api/sentences/all');
	};

	//get first sentence

	sentenceFactory.first = function() {

		return $http.get('/api/sentences/start');
	};


	// create a sentence

	sentenceFactory.create = function(sentenceData) {

		return $http.post('api/sentences/', sentenceData);
	};

	 // update a sentence
	sentenceFactory.update = function(id, sentenceData) { 

		return $http.put('/api/sentences/' + id, sentenceData);
	};


	// delete a sentence

	sentenceFactory.delete = function(id) { 

		return $http.delete('/api/sentences/' + id);
	};

	// get branches

	sentenceFactory.branch = function(id,node) { 

		return $http.get('/api/sentences/branch/' + id + '/'+node);
	};

	sentenceFactory.deleteAll = function() { 

		return $http.delete('/api/sentences/all');
	};


	return sentenceFactory;


}]);



angular.module('userApp',[

'app.routes',
'sentenceService',
'mainCtrl',
'quadCtrl',



])
angular.module('app.routes', ['ngRoute']) 

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  	$routeProvider
    // home page route
    .when('/', {
      templateUrl : 'app/views/pages/home.html',
      controller : "mainController",
      controllerAs: "mainController as main"
      
    })
    // get rid of the hash in the URL

    .when('/:sentence_id', {
      templateUrl : 'app/views/pages/story.html',
      controller : "mainController",
      controllerAs: "mainController as main"
      
    })


    $locationProvider.html5Mode(true); 



}]);

  	