import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';

/**
 * @return {obj} Returns appropriate message for success or failure request
 * @param {obj} req
 * @param {obj} res
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
        from: 'postit028@gmail.com', // sender address
        to: email, // receiver address
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


/**
 * @return {obj} Returns appropriate message for success or failure request
 * @param {obj} req
 * @param {obj} res
 */
export const resetPassword = (req, res) => {
  const password = req.body.password,
    confirmPassword = req.body.confirmPassword,
    token = req.params.token;
  if (password && confirmPassword && (password === confirmPassword)) {
    if (token) {
// verifies secret and checks exp
      jwt.verify(token, process.env.PASSWORD_RESET, (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: 'Invalid token, try again' });
        }
        const email = decoded.email;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
        // Store hash in your password DB.
            User.update({ password: hash }, { where: { email } })
           .then((result) => {
             if (result) {
               res.status(200).json({ message: 'You have successfully resetted your password.' });
             }
           }).catch(() => {
             res.status(500).json({ message: 'Internal server error' });
           });
          });
        });
      });
    }
  } else {
    res.status(409).json({ message: 'Password mismatch. Retype your password' });
  }
};

