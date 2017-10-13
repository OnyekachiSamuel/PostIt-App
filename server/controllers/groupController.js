import env from 'dotenv';
import Group from '../models/group';
import User from '../models/user';
import UsersGroup from '../models/usersgroup';
import paginate from './helper/paginate';

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
    Group.findOne({ where: { groupName } })
      .then((group) => {
        if (!group) {
          Group.sync({ force: false }).then(() => {
            Group.create({ groupName, description, userId })
              .then((createdGroup) => {
                if (createdGroup) {
                  UsersGroup.sync({ force: false }).then(() => {
                    UsersGroup.create({ groupId: createdGroup.id, userId });
                  }).then(() => {
                    res.status(200).json({
                      group: {
                        groupId: createdGroup.id,
                        groupName: createdGroup.groupName,
                        description: createdGroup.description
                      },
                      message: 'Group successfully created'
                    });
                  });
                }
              }).catch((error) => {
                if (error) {
                  res.status(409).json({
                    message: 'Oops, something went wrong'
                  });
                }
              });
          });
        } else {
          res.status(409).json({
            message: 'Group already exist'
          });
        }
      });
  }
  /** This method gets the group a user belongs to
 * @param {obj} req
 * @param {obj} res
 * @return {Array} Array of objects containing groups a user belongs to
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
  /** This method gets all the groups a user has been added to
   * @param {obj} req
   * @param {obj} res
   * @return {Array} Returns arrays of groups a user belongs to
   */
  static usersGroup(req, res) {
    const userId = req.params.userId;
    let ids;
    UsersGroup.findAll({ attributes: ['groupId'], where: { userId } })
      .then((groupIds) => {
        if (groupIds) {
          ids = [];
          groupIds.forEach((group) => {
            ids.push(group.dataValues.groupId);
          });
        }
        Group.findAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { id: ids } })
          .then((groups) => {
            if (groups) {
              res.status(200).json({ groups });
            }
          });
      });
  }

  /** This method gets the names of all members in a group
   * @param {obj} req
   * @param {obj} res
   * @return {obj} Returns object containing array of group members name
   */
  static getAllUsersInGroup(req, res) {
    const groupId = req.params.groupId;
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
/**
 *This method gets the paginated response for groups a user belongs to
 * @param {obj} req
 * @param {obj} res
 * @return {obj} Returns object containing the paginated groups fetched
 */
  static fetchUsersGroup(req, res) {
    const userId = req.params.userId,
      limit = req.query.limit || 5,
      offset = req.query.offset ? parseInt(req.query.offset, 10) : 0,
      nextOffset = offset + limit,
      previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    let ids;
    UsersGroup.findAll({ attributes: ['groupId'], where: { userId } })
      .then((groupIds) => {
        if (groupIds) {
          ids = [];
          groupIds.forEach((group) => {
            ids.push(group.dataValues.groupId);
          });
        }
        Group.findAndCountAll({ attributes: [['id', 'groupId'], 'groupName', 'description'], where: { id: ids } })
          .then((result) => {
            const users = result.rows;
            const paginatedGroups = users.slice(offset, offset + limit);
            const groupMetaData = paginate(
              limit,
              offset,
              nextOffset,
              previousOffset,
              result
            );
            res.status(200).json({ groupMetaData, paginatedGroups });
          });
      });
  }
}

