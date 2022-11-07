const userModel = require('./user.model');
const otpModel = require('./otp.model');
const bcrypt = require('bcrypt');
const { getOTP, sendMail } = require('../services/service');
const { createToken } = require('../auth/auth');

// Function to create a user
const createUser = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    const newUser = new userModel();
    newUser.firstName = userInfo.firstName;
    newUser.lastName = userInfo.lastName;
    newUser.email = userInfo.email;
    newUser.password = await bcrypt.hash(userInfo.password, 10);
    newUser.phoneNumber = userInfo.phoneNumber;

    newUser.save(async (err, data) => {
      if (err)
        reject({
          message: 'Error occured on creating a new user!',
          statusCode: 501,
          err,
        });
      resolve({
        message: 'Successfully created the user !',
        statusCode: 200,
        data,
      });
    });
  });
};

// send OTP
const sendOTP = (userInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const otp = getOTP();
      const newOtp = new otpModel();
      newOtp.user = userInfo._id;
      newOtp.token = await bcrypt.hash(otp, 10);
      newOtp.save(async (err, data) => {
        if (err)
          reject({
            message: 'Error occured while saving otp in DB!',
            statusCode: 501,
            err,
          });
        const message = await sendMail({ otp, mail: userInfo.mail });
        resolve(message);
      });
    } catch (err) {
      reject({
        message: 'Error occured on sending mail',
        err,
        statusCode: 501,
      });
    }
  });
};

// check if user is valid or not
const checkUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ email: userInfo.email }, (err, dbData) => {
      if (err)
        reject({
          message: 'Error occured while checking if user exists',
          err,
          statusCode: 501,
        });
      bcrypt.compare(userInfo.password, dbData.password, async (err, data) => {
        if (err)
          reject({ message: 'Password is incorrect', err, statusCode: 501 });
        const token = await createToken({ email: data.email, _id: data._id });
        resolve({ message: 'User is valid', statusCode: 200, token, dbData });
      });
    });
  });
};

module.exports = {
  createUser,
  sendOTP,
  checkUser,
};
