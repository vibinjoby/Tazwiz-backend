const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

async function sendMail(username, recepient) {
  try {
    var source = fs
      .readFileSync(process.env.PWD + "/views/mail.hbs", "utf-8")
      .toString();
    const template = handlebars.compile(source);

    const replacements = {
      username
    };

    const htmlToSend = template(replacements);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD
      }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.MAIL_USER_NAME, // sender address
      to: recepient, // list of receivers
      subject: "Confirmation Email", // Subject line
      //text: template ,// plain text body
      html: htmlToSend // html body
    });

    return info.messageId;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };
