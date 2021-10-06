const Rating = require('../models/rating');
const Answer = require('../models/answer');
const mongoose = require('mongoose');

exports.addRating = async (req, res) => {
	try {
		let rating;

		if (req.body.question) {
			rating = new Rating({
				author: req.userId,
				value: req.body.value,
				question: new mongoose.Types.ObjectId(req.body.question)
			});
		} else {
			rating = new Rating({
				author: req.userId,
				value: req.body.value,
				answer: new mongoose.Types.ObjectId(req.body.answer)
			});
		}

		await rating.save();

		res.json({ rating, message: 'Rating added successfully!' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteQuestionRating = async (req, res) => {
	try {
		await Rating.findOneAndDelete({
			question: req.params.questionId,
			author: req.userId,
			value: req.query.value
		})
			.lean()
			.exec();

		res.json({ message: 'Rating removed!' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};

exports.getQuestionRatings = async (req, res) => {
	try {
		const likes = await Rating.find(
			{ value: 1, question: req.params.questionId },
			'-__v'
		)
			.lean()
			.exec();
		const dislikes = await Rating.find(
			{ value: 0, question: req.params.questionId },
			'-__v'
		)
			.lean()
			.exec();

		res.json({ likes, dislikes });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};

exports.deleteAnswerRating = async (req, res) => {
	try {
		console.log(req.query.value)
		await Rating.findOneAndDelete({
			answer: req.params.answerId,
			author: req.userId,
			value: req.query.value
		})
			.lean()
			.exec();

		res.json({ message: 'Rating removed!' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};

exports.getAnswerRatings = async (req, res) => {
	try {
		const answer = await Answer.findOne(
			{ _id: req.params.answerId, question: req.params.questionId },
			'-__v -author -date -text'
		)
			.lean()
			.exec();
		const likes = await Rating.find(
			{ value: 1, answer: req.params.answerId },
			'-__v'
		)
			.lean()
			.exec();

		const dislikes = await Rating.find(
			{ value: 0, answer: req.params.answerId },
			'-__v'
		)
			.lean()
			.exec();

		res.json({ answer: answer, likes, dislikes });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};
