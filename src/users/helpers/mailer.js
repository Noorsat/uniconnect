require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendEmail(email, code) {
  try {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'itsnursat@gmail.com',
        pass: 'pdlfyedtkldiqrik'
      }
    });
    
    var mailOptions = {
      from: 'itsnursat@gmail.com',
      to: email,
      subject: 'UniConnect',
      text: `Your verify code is :${code}   
      `
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error("error")
      } else {
        console.log("send")
      }
    });
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}

module.exports = { sendEmail };
