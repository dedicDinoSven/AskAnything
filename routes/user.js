const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const controller = require('../controllers/userController');

router.get('/profile', auth.verifyToken, controller.profileDetails);

router.patch(
	'/profile/update-details',
	auth.verifyToken,
	controller.editProfileDetails
);

router.put('/profile/change-password', auth.verifyToken, controller.editPassword);

module.exports = router;
