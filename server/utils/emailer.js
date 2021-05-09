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

transporter.verify().then(() => {
  console.log("The server is ready to send emails.");
});

const generateEmailTextFromOrder = function (order) {
  let emailText = "Order confirmed\nOrder Details:\n";
  emailText += "Buyer Email: " + order.email + "\n";
  emailText +=
    "Buyer Details:\n" +
    order.address.name.full_name +
    "\n" +
    order.address.address.address_line_1 +
    "\n" +
    order.address.address.admin_area_2 +
    "\n" +
    order.address.address.postal_code +
    "\n";

  emailText += "Order Items:\n";
  order.orderItems.forEach((item) => {
    emailText += " -" + item.name + "\n";
    emailText += " * Amounts: " + JSON.stringify(item.sizes) + "\n";
  });
  emailText += "\n-- TOTAL: " + order.orderPrice + " --\n";
  emailText += "-- Thank you for your order --\n";
  return emailText;
};

exports.sendOrderEmail = async function (receiverEmail, order) {
  // send mail with defined transport object
  const emailText = generateEmailTextFromOrder(order);
  let info = await transporter.sendMail({
    from: '"PIECE OF EIGHT" <seller@pieceofeight.com>', // sender address
    to: receiverEmail, // list of receivers
    subject: "Order Confirmation", // Subject line
    text: emailText, // plain text body
    //html: "<b>THIS IS COOL ISN't it?</b>", // html body
  });

  console.log(" Message sent: %s", info.messageId);
};
