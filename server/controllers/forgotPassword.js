import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/** This method is used to send the user a reset password link
 * @param {obj} req
 * @param {obj} res
 * @return {obj} Returns appropriate response message
 * for a successful or failed request
 */
export const forgotPassword = (req, res) => {
  const email = req.body.email;
  const payload = { email },
    token = jwt.sign(payload, process.env.PASSWORD_RESET, {
      expiresIn: 5 * 60 * 60
    });
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found, Sign up for a new account' });
    } else {
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
        from: 'postit028@gmail.com',
        to: email,
        subject: 'Request for change of password',
        text: `You are receiving this email because you have requested the reset of the password for your account.Please click on the link below, or copy and paste this link into your browser to complete the process:  
        This link will expire in 5 hours from the time it was sent.
          http://${req.headers.host}/forgetPassword/${token}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
      });
      res.status(200).json({ message: 'Check your email and use the link to reset your password' });
    }
  });
};

export default forgotPassword;

