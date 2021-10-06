const Answer = require('../models/answer');
const Question = require('../models/question');

exports.newAnswer = async (req, res) => {
	try {
		const answer = new Answer({
			author: req.userId,
			text: req.body.text,
			question: req.params.id
		});
		await answer.save();

		const question = await Question.findByIdAndUpdate(
			req.params.id,
			{ $push: { answers: answer._id } },
			{ new: true }
		)
			.lean()
			.exec();

		res.json({ question, answer });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editAnswer = async (req, res) => {
	try {
		const answer = await Answer.findOne({ _id: req.params.id }).exec();

		if (answer.author.toString() !== req.userId) {
			return res
				.status(401)
				.json({ message: 'You can edit only your own answers!' });
		}

		answer.text = req.body.text;
		await answer.save();

		res.json({ message: 'Update successful!' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteAnswer = async (req, res) => {
	try {
		const answer = await Answer.findOne({ _id: req.params.id }).exec();

		if (answer.author.toString() !== req.userId) {
			return res
				.status(401)
				.json({ message: 'You can delete only your own answers!' });
		}

		await Question.findByIdAndUpdate(answer.question, {
			$pull: { answers: req.params.id }
		})
			.lean()
			.exec();

		await Answer.deleteOne({ _id: req.params.id }).lean().exec();

		res.json({ message: 'Delete successful!' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.mostAnswersList = async (req, res) => {
	try {	
		const mostActiveUsers = await Answer.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			},
			{
				$group: {
					_id: '$user',
					answersCount: { $sum: 1 }
				}
			},
			{ 
				$sort: { answersCount: -1 } 
			},
			{
				$limit: 10
			},
			{
				$project: {
					'_id.password': 0,
					'_id.__v': 0
				}
			}
		]);

		res.json(mostActiveUsers);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}
};
