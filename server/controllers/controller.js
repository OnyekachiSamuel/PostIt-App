import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import User from '../models/user';
import Group from '../models/group';
import UsersGroup from '../models/usersgroup';

env.config();
// socket(app)

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
      username = req.body.username.toLowerCase(),
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
              res.status(409).json({
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
    const username = req.body.username.toLowerCase(),
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
            data: {
              userId: user.dataValues.id,
              username: user.dataValues.username,
              email: user.dataValues.email,

            },
            message: 'Logged In',
            token
          });
        } else {
          res.status(400).json({
            message: 'Invalid Password' });
        }
      } else {
        res.status(404).json({
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
              res.status(200).json({
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
            res.status(409).json({ status: 'failed',
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
              res.status(200).json({
                message: 'User successfully added' });
            } else {
              res.status(409).json({ status: 'failed',
                message: 'User already exist in this group' });
            }
          });
        });
      }
    }
    );
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
            res.status(200).json({ allUser });
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
        res.status(200).json({ users });
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
        res.status(200).json({ groups });
      }
    });
    });
  }
  static usersGroup(req, res) {
    const userId = req.params.userId;
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
  static googleAuth(req, res) {
    const name = req.body.name, username = req.body.username.toLowerCase(), email = req.body.email;
    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        User.sync({ force: false }).then(() => {
          User.create({ name, username, email }).then((userDetail) => {
            const payload = { username: userDetail.username,
              userId: userDetail.id,
              email: userDetail.email,
              name: userDetail.name
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24
            });
            res.status(200).json({
              message: 'Account created',
              token
            });
          }).catch((err) => {
            if (err) {
              res.status(500).json({
                message: 'Oops, operation failed'
              });
            }
          });
        });
      } else {
        const payload = { username: user.dataValues.username,
          userId: user.dataValues.id,
          email: user.dataValues.email,
          name: user.dataValues.name
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 60 * 60 * 24
        });
        res.status(200).json({
          message: 'Logged In',
          token
        });
      }
    });
  }
}

