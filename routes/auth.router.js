const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');


router.post('/login',
    authMiddleware.isUserPresentForAuth,
    authController.login);


module.exports = router;
