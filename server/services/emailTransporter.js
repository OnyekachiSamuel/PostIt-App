import nodemailer from 'nodemailer';

/**
 * This method is used for sending email to users
 * @param {string} name
 * @param {string} email
 * @param {string} priority
 * @param {string} message
 * @param {array} emails
 * @return {null} It sends mail and returns nothing
 */
const emailTransporter = (name, email, priority, message, emails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: 'postit028@gmail.com',
      pass: process.env.G_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  const mailOptions = {
    from: `${name} <${email}>`,
    to: emails.toString(),
    subject: `${priority} message`,
    html: `<b>${message}\n\n This message was sent through PostIt app.</b>`
  };
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
  });
};

export default emailTransporter;
