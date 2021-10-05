const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

