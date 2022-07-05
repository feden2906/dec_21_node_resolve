const { userService, passwordService, emailService, smsService, s3Service } = require('../services');
const { userPresenter } = require('../presenters/user.presenter');
const { emailActionTypeEnum, smsActionTypeEnum } = require('../enums');
const { smsTemplateBuilder } = require('../common');

module.exports = {
  findUsers: async (req, res, next) => {
    try {
      const users = await userService.findUsers(req.query).exec();

      const usersForResponse = users.map(u => userPresenter(u));

      res.json(usersForResponse);
    } catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { email, password, name, phone } = req.body;
      const hash = await passwordService.hashPassword(password);

      const user = await userService.createUser({ ...req.body, password: hash });

      const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', user._id);

      const userWithPhoto = await userService.updateOneUser({ _id: user._id }, { avatar: Location });

      const sms = smsTemplateBuilder[smsActionTypeEnum.WELCOME](name);

      await Promise.allSettled([
        smsService.sendSMS(phone, sms),
        emailService.sendMail(email, emailActionTypeEnum.WELCOME, { name })
      ]);

      const userForResponse = userPresenter(userWithPhoto);

      res.status(201).json(userForResponse);
    } catch (e) {
      next(e);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { user } = req;

      const userForResponse = userPresenter(user);

      res.json(userForResponse);
    } catch (e) {
      next(e);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (req.files?.avatar) {
        if (req.user.avatar) {
          const { Location } = await s3Service.uploadFile(req.files.avatar, 'user', id);
          req.body.avatar = Location;
        } else {
          const { Location } = await s3Service.updateFile(req.files.avatar, req.user.avatar);
          req.body.avatar = Location;
        }
      }

      const updatedUser = await userService.updateOneUser({ _id: id }, req.body);

      const userForResponse = userPresenter(updatedUser);

      res.status(201).json(userForResponse);
    } catch (e) {
      next(e);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;

      await userService.deleteOneUser({ _id: id });

      if  (req.user.avatar) {
        await s3Service.deleteFile(req.user.avatar);
      }

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
};
