const Question = require('../models/question');
const Rating = require('../models/rating');

exports.newQuestion = async (req, res) => {
	try {
		const question = new Question({
			author: req.userId,
			title: req.body.title,
			text: req.body.text
		});
		await question.save();

		res.json({ question });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.questionDetails = async (req, res) => {
	try {
		const question = await Question.findById(req.params.id, '-__v')
			.populate('author', '-__v -password')
			.populate({
				path: 'answers',
				populate: {
					path: 'author',
					select: '-__v -password'
				},
				select: '-__v'
			})
			.lean()
			.exec();

		res.json(question);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.allQuestions = async (req, res) => {
	try {
		const questions = await Question.find({}, '-__v')
			.populate('author', '-__v -password')
			.sort([['date', 'desc']])
			.exec();

		res.json(questions);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};
