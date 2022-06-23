const jwt = require('jsonwebtoken');

const { configs } = require("../configs");
const { CustomError } = require('../errors');

function generateAuthTokens(payload = {}) {
  const access_token = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refresh_token = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

  return {
    access_token,
    refresh_token
  }
}

function checkAccessToken(token = '') {
  try {
    return jwt.verify(token, configs.ACCESS_TOKEN_SECRET);
  } catch (e) {
    throw new CustomError(`Token not valid`, 401);
  }
}

module.exports = {
  checkAccessToken,
  generateAuthTokens
}
