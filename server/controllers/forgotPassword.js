import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * This method is used to send the user a reset password link
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
        from: 'postit028@gmail.com',
        to: email,
        subject: 'Request for change of password',
        html: `<body style="max-width:100%; color: #000;">
<div style="background-color:#417391; padding:10px; color:white; height: 60px;">
<h3 style="text-align: center; font-size: 40px; margin-top: 5px; color: #fff; ">Post It</h3>
</div>
<div style="outline: 0px solid black; padding-left: 20px; padding-right: 30px; box-shadow: 0 27px 55px 0 rgba(0, 0, 0, 0.3), 0 17px 17px 0 rgba(0, 0, 0, 0.15);">
<div>
<p>You are receiving this email because you have requested the reset of the password for your account.</p>
<p>Please click on the button below to complete the process.</p>  
<p><b>Note:</b> This link will expire in 5 hours from the time it was sent.</p>
</div>
<p>If you didn't make any such request, please ignore this email. Otherwise, please click the button below to reset your password</p>
<div style="align-items: center; width: 100%">
    <a href="http://${req.headers.host}/forgetPassword/${token}" style="width: 150px; padding:10px 0; text-decoration: none; cursor: pointer !important; display: block; border: 1px solid #417391; background-color: #fff; color: #417391; font-size: 18px; margin: auto; text-align: center">Click to reset</a>
    </div>
        <br>
    <br>
</div>
</body>`
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          throw error;
        }
      });
      res.status(200).json({ message: 'Check your email and use the link to reset your password' });
    }
  });
};

export default forgotPassword;

