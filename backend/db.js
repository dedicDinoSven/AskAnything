const mongoose = require('mongoose');

const mongoURI = process.env.ATLAS_URI

mongoose
	.connect(mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

