require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('./db');
const path = require('path');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/question', require('./routes/question'));
app.use('/answer', require('./routes/answer'));
app.use('/rating', require('./routes/rating'));

/* app.use(express.static(path.join(__dirname, "client", "build")))

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
