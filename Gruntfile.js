module.exports = function(grunt) {



// Project configuration.
grunt.initConfig({
  concat: {
   
    dist: {
      src: ['public/app/controllers/mainController.js', 'public/app/controllers/branchController.js', 'public/app/services/sentenceService.js',
      'public/app/app.js', 'public/app/app.routes.js'],
      dest: 'public/build/js/angular.js',
    },
  },

	
	uglify: {
	    my_target: {
	      files: {
	        'public/build/js/angular.min.js': 'public/build/js/angular.js'
	      }
	    }
  	},

  	watch: {
	  js: {
	    files: ['public/app/**/**/*.js'],
	    tasks: ['concat', 'uglify'],
	    
	  },
	},
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');


};