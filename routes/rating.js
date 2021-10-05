const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/ratingController');

router.post('/add', auth.verifyToken, controller.addRating);

router.delete(
	'/question/:questionId',
	auth.verifyToken,
	controller.deleteQuestionRating
);

router.get('/question/:questionId', controller.getQuestionRatings);

router.delete(
	'/answer/:answerId',
	auth.verifyToken,
	controller.deleteAnswerRating
);

router.get('/answer/:answerId/:questionId', controller.getAnswerRatings);

module.exports = router;
