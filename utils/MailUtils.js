const nodemailer = require('nodemailer');
const EJS = require('ejs');
const Promise = require('bluebird');
module.exports = {
  sendEmail,
};


function sendEmail(fromMailConfig, mailTemplate, subject, sentInfo, receivers) {
  const supportTransporter = nodemailer.createTransport({
    host: fromMailConfig.host,
    port: fromMailConfig.port,
    secure: parseInt(fromMailConfig.port) == 465, // secure:true for port 465, secure:false for port 587
    auth: {
      user: fromMailConfig.username,
      pass: fromMailConfig.password,
    },
    tls: {
      rejectUnauthorized: false
  }
  },);

  return new Promise((resolve, reject) => {
    let path;

    path = `${__dirname}/config/mail-templates/${mailTemplate}.ejs`;

    //logger.info({ file: __filename, fnction: sendEmail }, 'Sending Email');

    send(supportTransporter, fromMailConfig.email, receivers, subject, path, sentInfo, resolve);
  });
}


function send(transporter, email, receivers, subject, path, sentInfo, resolve) {
  EJS.renderFile(path, sentInfo, {}, (err, str) => {
    const mailOptions = {
      from: process.env.RESET_PASSWORD_FROM_MAIL, // sender address
      to: receivers, // list of receivers
      subject, // Subject line
      html: str, // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       console.log({ file: __filename, fnction: send, err: error }, 'Need an action to handle in case there is an error');
      }
      console.log({ file: __filename, fnction: send }, 'Email has been sent successfully');
    });
    // Did that because no way to know if the email is sent successfully.
    resolve('In Progress sending');
  });
}
