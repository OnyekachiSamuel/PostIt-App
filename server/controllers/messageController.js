import env from 'dotenv';
import Jusibe from 'jusibe';
import nodemailer from 'nodemailer';
import Messages from '../models/message';
import Group from '../models/group';
import { getUsersPhoneEmail } from '../controllers/helper/getUsersPhoneEmail';

env.config();

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
  static postMessage(req, res) {
    const message = req.body.message,
      priority = req.body.priority,
      groupId = req.params.groupId,
      userId = req.decoded.userId,
      username = req.decoded.username;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      return Messages.sync({ force: false }).then(() => {
        Messages.create({ userId, groupId, message, priority, username })
        .then((content) => {
          if (priority === 'Critical') {
            getUsersPhoneEmail(groupId, (result) => {
              const { phoneNumbers, emails } = result;
              const jusibe = new Jusibe(process.env.PUBLIC_KEY,
               process.env.ACCESS_TOKEN);
              phoneNumbers.forEach((number) => {
                const payload = {
                  to: number,
                  from: req.decoded.username,
                  message: content.message
                };
                jusibe.sendSMS(payload)
                  .then(() => {
                  })
                  .catch((error) => {
                    if (error) {
                      throw error;
                    }
                  });
              });
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
                from: `${req.decoded.name} <${req.decoded.email}>`,
                to: emails.toString(),
                subject: `${priority} message`,
                html: `<b>${content.message}\n\n This message was sent through PostIt app.</b>`
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  throw error;
                }
              });
            });
          } else if (priority === 'Urgent') {
            getUsersPhoneEmail(groupId, (result) => {
              const { emails } = result;
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
                from: `${req.decoded.username} <${req.decoded.email}>`,
                to: emails.toString(),
                subject: `${priority} message`,
                html: `<b>${content.message}\n\n </b>.\n\n This message was sent through PostIt app.`
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  throw error;
                }
              });
            });
          }
          res.status(200).json({
            post: {
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
            res.status(500).json({ message: 'Message sending failed' });
          }
        });
      });
    }
  }

  /**
 * @return {json} Returns array of message objects posted in a group
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
          Messages.findAll({
            attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId, archived: false
            },
            order: [['createdAt', 'DESC']]
          }).then((posts) => {
            if (posts) {
              res.status(200).json({
                posts,
                message: 'Received',
                groupCreator: true
              });
            }
          });
        } else {
          Messages.findAll({
            attributes: ['id', 'message', 'groupId', 'userId', 'priority', 'username', 'createdAt'],
            where: {
              groupId, archived: false
            },
            order: [['createdAt', 'DESC']]
          }).then((posts) => {
            if (posts) {
              res.status(200).json({
                posts,
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
   * @return {array} It returns array of objects of messages of the user
   * @param {obj} req
   * @param {obj} res
   */
  static getUserMessages(req, res) {
    const userId = req.params.userId,
      groupId = req.params.groupId;
    const isUserId = Number.isInteger(parseInt(userId, 10));
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isUserId && isGroupId) {
      Messages.findAll({
        attributes: ['groupId', 'message', 'priority', 'createdAt', 'username'],
        where: {
          groupId, userId, archived: false
        },
        order: [['createdAt', 'DESC']]
      }).then((posts) => {
        if (posts) {
          res.status(200).json({
            posts,
            message: 'Received'
          });
        }
      });
    }
  }
  /**
   * @return {obj} Returns object of the number of messages that are archived
   * @param {obj} req
   * @param {obj} res
   */
  static archiveMessage(req, res) {
    const groupId = req.params.groupId;
    Messages.update({ archived: true }, { where: { groupId } })
    .then((message) => {
      if (message) {
        res.status(200).json({ message, groupCreator: true });
      }
    });
  }
}

