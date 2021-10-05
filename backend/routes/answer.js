const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/answerController');

router.post('/add-new/:id', auth.verifyToken, controller.newAnswer);

router.put('/:id', auth.verifyToken, controller.editAnswer);

router.delete('/:id', auth.verifyToken, controller.deleteAnswer);

router.get('/most-active-users', controller.mostAnswersList);

module.exports = router;
