const { CustomError } = require('../errors');
const { constants } = require('../configs');

module.exports = {
  checkUserAvatar: async (req, res, next) => {
    try {
      if (!req.files?.avatar) {
        return next();
      }

      const { mimetype, size } = req.files.avatar;

      if (size > constants.IMAGE_MAX_SIZE) {
        return next(new CustomError('Max size 3MB'));
      }

      if (!constants.IMAGE_MIMETYPES.includes(mimetype)) {
        return next(new CustomError('Wrong file type'));
      }

      next();
    } catch (e) {
      next(e);
    }
  },
}
