const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: {
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }

});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
