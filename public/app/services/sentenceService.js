angular.module('sentenceService', [])

.factory('Sentence', ["$http", function($http) {

	var sentenceFactory = {};

	sentenceFactory.get = function(id) {

		return $http.get('/api/sentences/' + id);
	};


	// get all sentences

	sentenceFactory.all = function() {

		return $http.get('/api/sentences/');
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


	return sentenceFactory;


}]);


