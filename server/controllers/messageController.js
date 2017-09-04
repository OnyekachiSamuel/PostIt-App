import env from 'dotenv';
import Jusibe from 'jusibe';
import nodemailer from 'nodemailer';
import Messages from '../models/message';
import Group from '../models/group'
import { getUsersPhoneEmail } from '../controllers/helper/getUsersPhoneEmail';

env.config();
// socket(app)

/**
 * @class ApiController
 */
export default class MessageController {
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
          // Get users emails and phone numbers
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
          data: {
            username: content.username,
            groupId: content.groupId,
            message: content.message,
            priority: content.priority,
            createdAt: content.createdAt
          },
          message: 'Message sent'
        });
      }).catch((error) => {
        if (error) {
          res.status(400).json({ message: 'Message sending failed' });
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
    const userId = req.decoded.userId;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      Group.findOne({ attributes: ['groupName', 'userId'], where: { id: groupId } }).then((groupCreator) => {
        if (groupCreator.dataValues.userId === userId) {
          Messages.findAll({ attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId, archived: false
            },
            order: [['createdAt', 'DESC']]
          }).then((data) => {
            if (data) {
              res.status(200).json({
                data,
                message: 'Received',
                groupCreator: true
              });
            }
          });
        } else {
          Messages.findAll({ attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId, archived: false
            },
            order: [['createdAt', 'DESC']]
          }).then((data) => {
            if (data) {
              res.status(200).json({
                data,
                message: 'Received',
                groupCreator: false
              });
            }
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
      Messages.findAll({ attributes: ['groupId', 'message', 'priority', 'createdAt', 'username'],
        where: {
          groupId, userId, archived: false
        },
        order: [['createdAt', 'DESC']]
      }).then((data) => {
        if (data) {
          res.status(200).json({
            data,
            message: 'Received'
          });
        }
      });
    }
  }
  static archiveMessage(req, res) {
    const groupId = req.params.groupId;
    Messages.update({ archived: true }, { where: { groupId } }).then((data) => {
      if (data) {
        res.status(200).json({ data, groupCreator: true });
      }
    });
  }
}

