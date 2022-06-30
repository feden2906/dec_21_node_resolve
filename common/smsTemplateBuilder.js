const { smsActionTypeEnum } = require('../enums');

module.exports = {
  [smsActionTypeEnum.WELCOME]: (name) => {
    return `Hi ${name}, welcome on our platform`;
  },
};
