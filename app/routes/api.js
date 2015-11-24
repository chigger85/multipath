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



	apiRouter.route('/sentences')


		.get(function(req, res) {
			Sentence.find(function(err, sentences) {
				if (err) return res.send(err);

				// return the users
				res.json(sentences);
			});
		})

		.post(function(req,res) {

			var sentence = new Sentence();
			sentence.content = req.body.content;
			sentence.branche1 = req.body.branche1;
			sentence.branche2 = req.body.branche2;
			sentence.branche3 = req.body.branche3;
			sentence.branche4 = req.body.branche4;


			sentence.save(function(err) {
				//if (err) return res.send(err);
				if (err) {
						return res.send(err);
					}
	 
	 			// return a message
	 			res.json({ message: 'sentence created!' });
	 			})
	 		});

				




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
				if (req.body.branche1) sentence.branches = req.body.branche1;
				if (req.body.branche2) sentence.branches = req.body.branche2;
				if (req.body.branche3) sentence.branches = req.body.branche3;
				if (req.body.branche4) sentence.branches = req.body.branche4;

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


		return apiRouter

  }



	




	

