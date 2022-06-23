const { checkAccessToken } = require("../services/token.service");
const { OAuth } = require("../dataBase");
const { CustomError } = require('../errors');
const { userService } = require('../services');

module.exports = {
  checkAccessToken: async (req, res, next) => {
    try {
      const access_token = req.get('Authorization');

      if (!access_token) {
        return next(new CustomError('No token', 401));
      }

      checkAccessToken(access_token);

      const tokenInfo = await OAuth.findOne({ access_token }).populate('userId');

      if (!tokenInfo) {
        return next(new CustomError('Token not valid', 401));
      }

      req.user = tokenInfo.userId;
      next();
    } catch (e) {
      next(e);
    }
  },

  isUserPresentForAuth: async (req, res, next) => {
    try {
      const {email} = req.body;

      const user = await userService.findOneUser({ email });

      if (!user) {
        return next(new CustomError('Wrong email or password'));
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}
