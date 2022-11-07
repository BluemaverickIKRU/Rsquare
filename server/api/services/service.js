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
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Rsquare</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Rsquare. Use the following OTP to verify your account. OTP is valid for 30 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${userInfo.otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Rsquare</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Rsquare inc</p>
          <p>India</p>
        </div>
      </div>
    </div>`,
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
