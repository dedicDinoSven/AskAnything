const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
