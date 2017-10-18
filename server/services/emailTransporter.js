import nodemailer from 'nodemailer';

/**
 * This method is used for sending email to users
 * @param {string} name
 * @param {string} email
 * @param {string} priority
 * @param {array} emails
 * @return {null} It sends mail and returns nothing
 */
const emailTransporter = (name, email, priority, emails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
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
    html: `<p> A new message has been posted to a group you belong to in PostIt by ${name}. Check it out now.</p>`
  };
  return transporter.sendMail(mailOptions, (error) => {
    if (error) {
      throw error;
    }
  });
};

export default emailTransporter;
