const router = require('express').Router();

const { userController } = require('../controllers');
const { commonMiddleware, userMiddleware, authMiddleware, fileMiddleware } = require('../middlewares');
const { userValidator, userQueryValidator } = require('../validators');

router.get('/',
    commonMiddleware.isDateValid(userQueryValidator.findAll, 'query'),
    userController.findUsers);
router.post('/',
    commonMiddleware.isDateValid(userValidator.newUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUniq,
    userController.createUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);
router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    fileMiddleware.checkUserAvatar,
    commonMiddleware.isDateValid(userValidator.updateUserValidator),
    userMiddleware.isUserPresent,
    userController.updateUserById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.deleteUserById);

module.exports = router;
