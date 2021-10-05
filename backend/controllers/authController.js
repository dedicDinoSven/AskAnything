const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'Email is already in use!' });
		}

		const newUser = new User({ firstName, lastName, email, password });
		await newUser.save();

		res.json({ message: 'Account created!' });
	} catch (err) {
		res.status(500).send({ message: err });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'User with given email does not exist!' });
		}

		const validatePassword = await user.isValidPassword(password);
		if (!validatePassword) {
			return res.status(400).json({ message: 'Incorrect password!' });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
			expiresIn: 86400
		});

		res.json({
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			accessToken: token,
			message: 'You have logged in!'
		});
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

