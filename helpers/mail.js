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
      host: process.env.SMTP_HOST,
      port: process.env.PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        //"punchme2020@gmail.com" "punch.me@2020"
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
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