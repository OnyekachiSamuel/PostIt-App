import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import Jusibe from 'jusibe';
import nodemailer from 'nodemailer';
import User from '../models/user';
import Group from '../models/group';
import UsersGroup from '../models/usersgroup';
import Messages from '../models/message';
import { getUsersPhoneEmail } from '../controllers/helper/getUsersPhoneEmail';


env.config();

/**
 * @class ApiController
 */
export default class ApiController {
  /**
 * Users details are captured by this method on signup and persisted on the database
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {JSON} Returns success or failure message with the data
 *
 */
  static signup(req, res) {
    const name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password,
      phone = req.body.phone;
    return User.sync({ force: false }).then(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          User.create({
            name, username, email, phone, password: hash
          }).then((user) => {
            const payload = { username: user.username,
              userId: user.id,
              email: user.email,
              name: user.name
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24
            });
            res.status(200).json({
              data: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone
              },
              message: 'Account created',
              token
            });
          }).catch((err) => {
            if (err) {
              res.json({
                status: 'failed',
                message: 'Record exists already' });
            }
          });
        });
      });
    });
  }

  /**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Return success or failure message
 */
  static signin(req, res) {
    const username = req.body.username,
      password = req.body.password;
    User.findOne({ where: { username } }).then((user) => {
      if (user && user.dataValues.username === username) {
        const check = bcrypt.compareSync(password, user.dataValues.password);
        const payload = { username: user.dataValues.username,
          userId: user.dataValues.id,
          email: user.dataValues.email,
          name: user.dataValues.name
        };
        if (check) {
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24
          });
          res.status(200).json({
            status: 'success',
            data: {
              userId: user.dataValues.id,
              username: user.dataValues.username,
              email: user.dataValues.email,

            },
            message: 'Logged In',
            token
          });
        } else {
          res.json({ status: 'failed',
            message: 'Invalid Password' });
        }
      } else {
        res.json({ status: 'failed',
          message: 'User not found' });
      }
    });
  }

  /**
 * This method is used for creating groups
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success or failure message with data
 */
  static createGroup(req, res) {
    const groupName = req.body.groupName,
      description = req.body.description,
      userId = req.decoded.userId;
    return Group.sync({ force: false }).then(() => {
      Group.create({ groupName, description, userId })
        .then((group) => {
          if (group) {
            return UsersGroup.sync({ force: false }).then(() => {
              UsersGroup.create({ groupId: group.id, userId });
            }).then(() => {
              res.json({
                status: 'success',
                data: {
                  groupId: group.id,
                  groupName: group.groupName,
                  description: group.description
                },
                message: 'Group successfully created'
              });
            });
          }
        }).catch((error) => {
          if (error) {
            res.status(422).json({ status: 'failed',
              message: 'Group already exist' });
          }
        });
    });
  }

  /**
   * This method maps users to groups they belong to
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {obj} Returns a success message with data or failure message
   */
  static addUser(req, res) {
    const groupId = req.params.groupId,
      username = req.body.username;
    User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        res.json({ message: 'Username does not exits' });
      } else {
        return UsersGroup.sync({ force: false }).then(() => {
          UsersGroup.findOrCreate({ where: { userId: user.id, groupId } })
          .spread((usergg, created) => {
            if (created) {
              res.json({ status: 'success',
                message: 'User successfully added' });
            } else {
              res.json({ status: 'failed',
                message: 'User already exist in this group' });
            }
          });
        });
      }
    }
    );
  }

  /**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success message with data or failure message
 */
  static messages(req, res) {
    const message = req.body.message,
      priority = req.body.priority,
      groupId = req.params.groupId,
      userId = req.decoded.userId,
      username = req.decoded.username;
    return Messages.sync({ force: false }).then(() => {
      Messages.create({ userId, groupId, message, priority, username }).then((content) => {
        if (priority === 'Critical') {
          // Fetch users emails and phone numbers
          getUsersPhoneEmail(groupId, (result) => {
            const { phoneNumbers, emails } = result;
            const jusibe = new Jusibe(process.env.PUBLIC_KEY, process.env.ACCESS_TOKEN);
            phoneNumbers.forEach((number) => {
              const payload = {
                to: number,
                from: req.decoded.username,
                message: content.message
              };
              jusibe.sendSMS(payload)
            .then((res) => {
              console.log(res.body);
            })
            .catch((err) => {
              console.log(err.body);
            });
            });
          // Send emails to users
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              port: 25,
              secure: false, // secure:true for port 465, secure:false for port 587
              auth: {
                user: 'postit028@gmail.com',
                pass: process.env.G_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            const mailOptions = {
              from: `${req.decoded.name} <${req.decoded.email}>`, // sender address
              to: emails.toString(), // list of receivers
              subject: priority, // Subject line
              // text: content.message, // plain text body
              html: `<b>${content.message}</b>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
            });
          });
        } else if (priority === 'Urgent') {
          // Fetch users emails and phone numbers
          getUsersPhoneEmail(groupId, (result) => {
            const { emails } = result;
          // Send emails to users
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              port: 25,
              secure: false, // secure:true for port 465, secure:false for port 587
              auth: {
                user: 'postit028@gmail.com',
                pass: process.env.G_PASSWORD
              },
              tls: {
                rejectUnauthorized: false
              }
            });
            const mailOptions = {
              from: `${req.decoded.username} <${req.decoded.email}>`, // sender address
              to: emails.toString(), // list of receivers
              subject: priority, // Subject line
              // text: content.message, // plain text body
              html: `<b>${content.message}</b>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                return console.log(error);
              }
              console.log('Message %s sent: %s', info.messageId, info.response);
            });
          });
        }
        res.status(200).json({
          status: 'success',
          data: {
            groupId: content.groupId,
            message: content.message,
            priority: content.priority
          },
          message: 'Message sent'
        });
      }).catch((error) => {
        if (error) {
          res.json({ status: 'failed', message: 'Message sending failed' });
        }
      });
    });
  }

  /**
 * @return {json} Success message with results or error message
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 *
 */
  static getMessages(req, res) {
    const groupId = req.params.groupId;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      Messages.findAll({ attributes: ['id', 'message', 'groupId', 'userId', 'priority'],
        where: {
          groupId
        }
      }).then((data) => {
        if (data) {
          res.status(200).json({
            status: 'success',
            data,
            message: 'Received'
          });
        }
      });
    }
  }

/**
 * @return {array} Array of objects
 * @param {obj} req
 * @param {obj} res
 */
  static getUserMessages(req, res) {
    const userId = req.params.userId,
      groupId = req.params.groupId;
    const isUserId = Number.isInteger(parseInt(userId, 10));
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isUserId && isGroupId) {
      Messages.findAll({ attributes: ['groupId', 'message', 'priority'],
        where: {
          groupId, userId
        }
      }).then((data) => {
        if (data) {
          res.status(200).json({
            status: 'success',
            data,
            message: 'Received'
          });
        }
      });
    }
  }
  /**
   * @return {array} Returns array of objects
   * @param {obj} req
   * @param {obj} res
   */
  static getUsersInGroup(req, res) {
    const groupId = req.params.groupId;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      UsersGroup.findAll({
        attributes: ['userId'], where: { groupId }
      }).then((users) => {
        if (users) {
          const allUsers = [];
          users.forEach((user) => {
            allUsers.push(user.userId);
          });
          User.findAll({
            attributes: ['username'],
            where: {
              id: allUsers
            }
          }).then((allUser) => {
            res.json({ status: 'success', allUser });
          });
        }
      });
    }
  }

/**
 * @return {array} Returns array of objects
 * @param {*} req
 * @param {*} res
 */
  static getAllUsers(req, res) {
    User.findAll({ attributes: ['id', 'username'] })
    .then((users) => {
      if (users) {
        res.json({ status: 'success', users });
      }
    });
  }

/**
 * @return {Array} Array of objects containing groups a user belongs to
 * @param {obj} req
 * @param {obj} res
 */
  static getUserGroups(req, res) {
    User.findOne({ attributes: ['id'], where: { username: req.params.username } })
    .then((user) => {
      const userId = user.id;
      Group.findAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { userId } })
    .then((groups) => {
      if (groups) {
        res.json({ groups });
      }
    });
    });
  }
}

