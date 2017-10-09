import env from 'dotenv';
import Group from '../models/group';
import User from '../models/user';
import UsersGroup from '../models/usersgroup';

env.config();
// socket(app)

/**
 * @class ApiController
 */
export default class GroupController {
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
              res.status(200).json({
                group: {
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
            res.status(409).json({
              status: 'failed',
              message: 'Group already exist'
            });
          }
        });
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
              res.status(200).json({ groups });
            }
          });
      });
  }
  /**
   * @return {Array} Returns arrays of groups a user belongs to
   * @param {obj} req
   * @param {obj} res
   */
  static usersGroup(req, res) {
    const userId = req.params.userId;
    const isUserId = Number.isInteger(parseInt(userId, 10));
    if (isUserId) {
      UsersGroup.findAll({ attributes: ['groupId'], where: { userId } })
        .then((groupIds) => {
          if (groupIds) {
            const ids = [];
            groupIds.forEach((group) => {
              ids.push(group.dataValues.groupId);
            });
            Group.findAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { id: ids } })
              .then((groups) => {
                if (groups) {
                  res.status(200).json({ groups });
                }
              });
          }
        });
    }
  }
  /**
   * @return {obj} Returns object containing array of userIds
   * @param {obj} req
   * @param {obj} res
   */
  static getAllUsersInGroup(req, res) {
    const groupId = req.params.groupId;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      UsersGroup.findAll({ attributes: ['userId'], where: { groupId } }).then((users) => {
        const userIds = [];
        users.forEach((user) => {
          userIds.push(user.dataValues.userId);
        });
        User.findAll({
          attributes: ['username'],
          where: {
            id: userIds
          }
        }).then((allUser) => {
          const groupMembers = [];
          allUser.forEach((user) => {
            groupMembers.push(user.username);
          });
          res.status(200).json({ groupMembers });
        });
      });
    }
  }
}

