import env from 'dotenv';
import Jusibe from 'jusibe';
import Messages from '../models/message';
import { getUsersPhoneEmail } from '../controllers/helper/getUsersPhoneEmail';
import emailTransporter from '../services/emailTransporter';

env.config();

/**
 * @class ApiController
 */
export default class MessageController {
  /**
 * This method is used for posting message to a group a user belongs to
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
                emailTransporter(
                  req.decoded.name,
                  req.decoded.email,
                  priority,
                  content.message,
                  emails);
              });
            } else if (priority === 'Urgent') {
              getUsersPhoneEmail(groupId, (result) => {
                const { emails } = result;
                emailTransporter(
                  req.decoded.name,
                  req.decoded.email,
                  priority,
                  content.message,
                  emails);
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

  /** This method is for getting messages posted in a particular group
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {json} Returns array of message objects posted in a group
 */
  static getMessages(req, res) {
    const groupId = req.params.groupId;
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
  }

  /** This method is for getting all messages posted by a particular user
   * @param {obj} req
   * @param {obj} res
   * @return {array} It returns array of objects of messages of the user
   */
  static getUserMessages(req, res) {
    const userId = req.params.userId,
      groupId = req.params.groupId;
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

