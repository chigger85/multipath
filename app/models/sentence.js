var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SentenceSchema = new Schema({

	content: String,
	origin: { type: Schema.Types.ObjectId, ref: 'Sentence' },
	start: Boolean,
	node: Number
});



module.exports = mongoose.model('Sentence', SentenceSchema);