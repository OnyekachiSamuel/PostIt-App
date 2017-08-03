import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import User from '../models/user';
import Group from '../models/group';
import UsersGroup from '../models/usersgroup';
import Messages from '../models/message';


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
      password = req.body.password;
    return User.sync({ force: false }).then(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          User.create({
            name, username, email, password: hash
          }).then((user) => {
            const payload = { username: user.username,
              userId: user.id
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24
            });
            res.status(200).json({
              status: 'success',
              data: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
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
          userId: user.dataValues.id
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
        }).catch((err) => {
          if (err) {
            res.json({ status: 'failed',
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
      userId = req.decoded.userId;
    return Messages.sync({ force: false }).then(() => {
      Messages.create({ userId, groupId, message, priority }).then((content) => {
        res.status(200).json({
          status: 'success',
          data: {
            groupId: content.groupId,
            message: content.message,
            priority: content.priority
          },
          message: 'Message sent'
        });
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
    Messages.findAll({ attributes: ['id', 'message', 'groupId', 'userId'],
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
  /**
   * @return {array} Returns array of objects
   * @param {*} req
   * @param {*} res
   */
  static getUsersInGroup(req, res) {
    const groupId = req.params.groupId;
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

  static addUsers(req, res) {
    const data = req.body.data;
    console.log(data.split(/[ ,]+/));
        // UsersGroup.bulkCreate();
  }
}
