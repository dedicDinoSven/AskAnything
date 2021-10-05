const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/questionController');

router.post('/add-new', auth.verifyToken, controller.newQuestion);

router.get('/details/:id', controller.questionDetails);

router.get('/all', controller.allQuestions);

module.exports = router;
