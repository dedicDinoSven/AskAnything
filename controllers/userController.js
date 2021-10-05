const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Answer = require('../models/answer');
const Question = require('../models/question');

exports.profileDetails = async (req, res) => {
	try {
		const user = await User.findById(req.userId, '-__v').lean().exec();

		const numberOfAnswers = await Answer.count({ author: req.userId })
			.lean()
			.exec();
		
			const numberOfQuestions = await Question.count({ author: req.userId })
			.lean()
			.exec();
		
			res.json({ user, numberOfAnswers, numberOfQuestions });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editProfileDetails = async (req, res) => {
	try {
		const id = req.userId;

		const otherUser = await User.findOne({
			email: req.body.email,
			_id: { $ne: id }
		})
			.lean()
			.exec();
		if (otherUser && req.body.email) {
			return res
				.status(409)
				.json({ message: 'Email is used by someone else!' });
		}

		const user = await User.findByIdAndUpdate(id, req.body, { new: true })
			.lean()
			.exec();

		res.json({user, message: 'Update successful!'});
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editPassword = (req, res, next) => {
	User.findById(req.userId, (err, user) => {
		if (err) {
			return next(err);
		}

		user.password = req.body.password;

		user.save((saveErr, updatedUser) => {
			if (saveErr) {
				return next(saveErr);
			}
			res.json({updatedUser, message: 'Password changed!'});
		});
	});
};
