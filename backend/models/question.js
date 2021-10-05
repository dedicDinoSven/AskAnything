const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
	},
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
    date: {
        type: Date,
        default: Date.now
    },
	answers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Answer'
		}
	],
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
