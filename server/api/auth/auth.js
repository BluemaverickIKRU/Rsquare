const jwt = require('jsonwebtoken');

const createToken = (tokenInfo) => {
  return jwt.sign(
    { _id: tokenInfo._id, email: tokenInfo.email },
    process.env.JWT_SECRET
  );
};

const checkToken = (tokenInfo) => {
  try {
    return jwt.verify(tokenInfo, process.env.JWT_SECRET);
  } catch (err) {
    return {
      message: 'Invalid JWT!',
      statusCode: 501,
    };
  }
};

module.exports = {
  createToken,
  checkToken,
};
