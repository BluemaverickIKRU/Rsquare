const nodemailer = require('nodemailer');

const getOTP = () => {
  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += String(Math.round(Math.random() * 9));
  }
  return otp;
};

const sendMail = (userInfo) => {
  return new Promise((resolve, reject) => {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bluemaverick8@gmail.com',
        pass: 'fivicblbximpxtoo',
      },
    });

    let mailDetails = {
      from: 'bluemaverick8@gmail.com',
      to: userInfo.mail,
      subject: 'Verify your email',
      text: `Your OTP is ${userInfo.otp}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err)
        reject({
          message: 'Error occured while sending mail in nodemailer',
          err,
          statusCode: 501,
        });
      resolve({ message: 'Email sent successfully!', statusCode: 200 });
    });
  });
};

module.exports = {
  getOTP,
  sendMail,
};
