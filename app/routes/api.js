var Sentence = require('../models/sentence');
var config = require('../../config');






module.exports = function(app, express) {

	// get an instance of the express router
	var apiRouter = express.Router();


	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});


	apiRouter.route('/sentences/all')


	.get(function(req, res) {
		
		Sentence.find(function(err, sentences) {
			if (err) return res.send(err);

			// return the users
			res.json(sentences);

		})

		
	})

// delete the sentence with this id
	.delete(function(req, res) {
		
		Sentence.remove({}, function(err, sentence) {
			if (err) return res.send(err);

			res.json({ message: 'All sentences deleted' });
		});
	})




	apiRouter.route('/sentences')

		.post(function(req,res) {

			var sentence = new Sentence();
			sentence.content = req.body.content;
			sentence.origin = req.body.origin;
			sentence.node = req.body.node;
			sentence.start= req.body.start;

           
			sentence.save(function(err) {
				//if (err) return res.send(err);
				if (err) {
						return res.send(err);
					}
	 
	 			// return a message
	 			res.json({ message: 'sentence created!' , posted: sentence});
	 			})
	 		});




	apiRouter.route('/sentences/start')


		.get(function(req, res) {
			
			Sentence.find({"start": true}, function(err, sentences) {
				if (err) return res.send(err);

				// return the users
				res.json(sentences);

			})

			
		})




	apiRouter.route('/sentences/:sentence_id')

	// delete the sentence with this id
		.delete(function(req, res) {
			Sentence.remove({
				_id: req.params.sentence_id
			}, function(err, sentence) {
				if (err) return res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		})


	// get the sentence with id
		.get(function(req, res) {
			Sentence.findById(req.params.sentence_id, function(err, sentence) {
				if (err) return res.send(err);

				// return that sentence
				res.json(sentence);
			});


		})


		// edit the sentence with id
		.put(function(req, res) {
			Sentence.findById(req.params.sentence_id, function(err, sentence) {
				
				if (err) return res.send(err);

				// set the new user information if it exists in the request
				if (req.body.content) sentence.content = req.body.content;
				if (req.body.origin) sentence.origin= req.body.origin;
				if (req.body.node) sentence.node = req.body.node;
				if (req.body.start) sentence.start= req.body.start;
				

				sentence.save(function(err) {
				//if (err) return res.send(err);
				if (err) {
						return res.send(err);
					}
	 
	 			// return a message
	 			res.json({ message: 'sentence updated!' });
	 			})
	 		});
		});


		apiRouter.route('/sentences/branch/:origin_id/:node')

		.get(function(req,res) {

			console.log(req.params.origin_id);

			Sentence.find({$and: [{"origin": req.params.origin_id},{"node": req.params.node}]}, function(err, data){

				if (err) return res.send(err);



				// return that sentence
				res.json(data)


			});
		});
			




		return apiRouter

  }



	




	

