import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';

export const forgotPassword = (req, res) => {
  const payload = { message: 'Password reset' },
    email = req.body.email,
    token = jwt.sign(payload, process.env.PASSWORD_RESET, {
      expiresIn: 60 * 60 * 24
    });
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      res.status(200).json({ message: 'User not found' });
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
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/api/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
      res.json({ status: 'success', message: 'Check your email and use the link to reset your password' });
    }
  });
};

export const resetPassword = (req, res) => {
  const password = req.body.password,
    confirmPassword = req.body.confirmPassword,
    email = req.body.email,
    token = req.params.token;
  if (password && confirmPassword && (password === confirmPassword)) {
    if (token) {
// verifies secret and checks exp
      jwt.verify(token, process.env.PASSWORD_RESET, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Link has expired. Try to reset your password again' });
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
        // Store hash in your password DB.
            User.update({ password: hash }, { where: { email } })
           .then((result) => {
             if (result) {
               res.json({ status: 'success', message: 'You have successfully resetted your password. Login now to your account' });
             }
           });
          });
        });
      });
    }
  } else {
    res.json({ message: 'Password mismatch. Retype your password' });
  }
};

