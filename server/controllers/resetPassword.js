import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';

/**
 * This method is for resetting a users password
 * @param {obj} req
 * @param {obj} res
 * @return {obj} Returns appropriate message for success or failure request
 */
export const resetPassword = (req, res) => {
  const password = req.body.password,
    confirmPassword = req.body.confirmPassword,
    token = req.params.token;
  if (password && confirmPassword && (password === confirmPassword)) {
    if (token) {
      jwt.verify(token, process.env.PASSWORD_RESET, (err, decoded) => {
        if (err) {
          return res.status(400).json({ message: 'Invalid token, try again' });
        }
        const email = decoded.email;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
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


export default resetPassword;
