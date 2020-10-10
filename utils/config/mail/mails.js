require('dotenv').config({path: `${__dirname}/.env`});
module.exports = {
  VERIFICATION_MAIL: {
    CODE: 'VERIFICATION_MAIL',
    CONFIG: {
      email: process.env.SUPPORT_EMAIL,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT
    }
  },
  FORGET_PASSWORD: {
    CODE: 'FORGET_PASSWORD',
    CONFIG: {
      email: process.env.SUPPORT_EMAIL,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT
    }
  },
  NOTIFICATION_MAIL: {
    CODE: 'NOTIFICATION_MAIL',
    CONFIG: {
      email: process.env.SUPPORT_EMAIL,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT
    }
  }
};
