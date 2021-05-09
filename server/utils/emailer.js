var nodemailer = require("nodemailer");
require("dotenv").config();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SELLER_EMAIL,
    pass: process.env.SELLER_EMAIL_PASSWORD,
  },
});

exports.sendEmail = async function (receiverEmail, emailText) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"PIECE OF EIGHT" <seller@pieceofeight.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Order Confirmation", // Subject line
    text: emailText, // plain text body
    //html: "<b>THIS IS COOL ISN't it?</b>", // html body
  });

  console.log(receiverEmail, " Message sent: %s", info.messageId);
};
