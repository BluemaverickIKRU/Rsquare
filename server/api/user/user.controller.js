const userModel = require('./user.model');
const otpModel = require('./otp.model');
const bcrypt = require('bcrypt');
const { getOTP, sendMail } = require('../services/service');
const { createToken, checkToken } = require('../auth/auth');

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
  return new Promise((resolve, reject) => {
    // Check if user already has a pre exisiting otp
    otpModel.findOne({ user: userInfo._id }, async (err, data) => {
      if (err)
        reject({
          message: 'Error occured while finding if user otp exist',
          err,
          statusCode: 501,
        });
      if (data) {
        const otp = getOTP();
        otpModel.updateOne(
          { user: userInfo._id },
          { $set: { token: await bcrypt.hash(otp, 10) } },
          async (err, data) => {
            if (err)
              reject({
                message:
                  'Error occured while replacing the existing otp with the new one',
                statusCode: 501,
                err,
              });
            const message = await sendMail({ otp, mail: userInfo.email });
            resolve(message);
          }
        );
      } else {
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
            const message = await sendMail({ otp, mail: userInfo.email });
            resolve(message);
          });
        } catch (error) {
          reject({
            message: 'Error occured on sending mail',
            error,
            statusCode: 501,
          });
        }
      }
    });
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
      if (dbData) {
        bcrypt.compare(userInfo.password, dbData.password, (err, data) => {
          if (err)
            reject({
              message: 'Password is incorrect',
              err,
              statusCode: 501,
            });
          if (data) {
            const token = createToken({
              email: dbData.email,
              _id: dbData._id,
            });
            resolve({
              message: 'User is valid',
              statusCode: 200,
              token,
              dbData,
            });
          } else {
            reject({ message: 'Password is incorrect!', statusCode: 404 });
          }
        });
      } else {
        reject({ message: 'User does not exists !', statusCode: 404 });
      }
    });
  });
};

// Validate OTP
const validateOTP = (otpInfo) => {
  return new Promise((resolve, reject) => {
    const tokenInfo = checkToken(otpInfo.token);
    otpModel.findOne({ user: tokenInfo._id }, async (err, data) => {
      if (err)
        reject({
          message: 'Error occured while getting otp for verification from DB!',
          statusCode: 501,
          err,
        });
      const dbOtp = await bcrypt.compare(otpInfo.otp, data.token);
      if (dbOtp) {
        userModel.updateOne(
          { email: tokenInfo.email },
          { $set: { mailVerified: true } },
          (err, data) => {
            if (err)
              reject({
                message:
                  'Error occured while updating email verified status in DB!',
                statusCode: 501,
                err,
              });
            resolve({ message: 'OTP verified', statusCode: 200 });
          }
        );
      } else {
        reject({ message: 'OTP does not match', statusCode: 404 });
      }
    });
  });
};

module.exports = {
  createUser,
  sendOTP,
  checkUser,
  validateOTP,
};
