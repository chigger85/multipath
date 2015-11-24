var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var SentenceSchema = new Schema({

	content: String,
	branche1: { type: Schema.Types.ObjectId, ref: 'Sentence' },
	branche2: { type: Schema.Types.ObjectId, ref: 'Sentence' },
	branche3: { type: Schema.Types.ObjectId, ref: 'Sentence' },
	branche4: { type: Schema.Types.ObjectId, ref: 'Sentence' },

})


module.exports = mongoose.model('Sentence', SentenceSchema);