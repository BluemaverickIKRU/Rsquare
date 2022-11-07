const jwt = require('jsonwebtoken');

const createToken = (tokenInfo) => {
  return new Promise((resolve, reject) => {
    jwt.sign(tokenInfo, process.env.JWT_SECRET, (err, data) => {
      if (err) reject({ message: 'Error occured at creating token!', err });
      resolve(data);
    });
  });
};

const checkToken = (tokenInfo) => {
  return new Promise((resolve, reject) => {
    jwt.verify(tokenInfo, process.env.JWT_SECRET, (err, data) => {
      if (err)
        reject({
          message: 'Error occured while verifying token!',
          err,
        });
      resolve({ data });
    });
  });
};

module.exports = {
  createToken,
  checkToken,
};
