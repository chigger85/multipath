angular.module('app.routes', ['ngRoute']) 

.config(function($routeProvider, $locationProvider) {
  
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



});

  	