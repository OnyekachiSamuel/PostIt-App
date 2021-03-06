import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import User from '../models/user';
import UsersGroup from '../models/usersgroup';
import paginate from './helper/paginate';

env.config();

/**
 * @class UserController
 */
export default class UserController {
/**
 * Users details are captured by this method on signup and
 *  persisted on the database
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success or failure message with the user token
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
            const payload = {
              username: user.username,
              userId: user.id,
              email: user.email,
              name: user.name
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
              res.status(409).json({
                message: 'Record exists already'
              });
            }
          });
        });
      });
    });
  }

/**
 * This method is used to grant the user access to the application
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Return user token for successful login or error response
 */
  static signin(req, res) {
    const username = req.body.username.toLowerCase(),
      password = req.body.password;
    User.findOne({ where: { username } }).then((user) => {
      if (user && user.dataValues.username === username) {
        const check = bcrypt.compareSync(password, user.dataValues.password);
        const payload = {
          username: user.dataValues.username,
          userId: user.dataValues.id,
          email: user.dataValues.email,
          name: user.dataValues.name
        };
        if (check) {
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24
          });
          res.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              phone: user.phone
            },
            message: 'Logged In',
            token
          });
        } else {
          res.status(400).json({
            message: 'Invalid Password'
          });
        }
      } else {
        res.status(404).json({
          message: 'User not found'
        });
      }
    });
  }

  /**
   * This method is used to add user to a particular group
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return {obj} Returns a success message with data or failure message
   */
  static addUser(req, res) {
    const groupId = req.params.groupId,
      username = req.body.username;
    const isGroupId = Number.isInteger(parseInt(groupId, 10));
    if (isGroupId) {
      User.findOne({ where: { username } }).then((user) => {
        if (!user) {
          res.json({ message: 'Username does not exits' });
        } else {
          return UsersGroup.sync({ force: false }).then(() => {
            UsersGroup.findOrCreate({ where: { userId: user.id, groupId } })
              .spread((usergg, created) => {
                if (created) {
                  res.status(200).json({
                    message: 'User successfully added'
                  });
                } else {
                  res.status(409).json({
                    status: 'failed',
                    message: 'User already exist in this group'
                  });
                }
              });
          });
        }
      }
      );
    }
  }

  /**
   * This method is used to get all users in a particular group
   * @param {obj} req
   * @param {obj} res
   * @return {array} Returns arrays of all users in a group
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
   * This method handles pagination for searching and adding
   * user to a group
   * @param {obj} req
   * @param {obj} res
   * @return {obj} Returns object containing pageCount and arrays
   *  of users and searchMetadata
   */
  static searchUsers(req, res) {
    const limit = req.query.limit || 5,
      offset = req.query.offset ? parseInt(req.query.offset, 10) : 0,
      nextOffset = offset + limit,
      previousOffset = (offset - limit < 1) ? 0 : offset - limit;
    const search = req.query.search.toLowerCase();
    if (search) {
      User.findAndCountAll({
        attributes: ['id', 'name', 'username'],
        where: {
          username: {
            $like: `%${search}%`
          }
        }
      })
        .then((result) => {
          const users = result.rows;
          const paginatedUsers = users.slice(offset, offset + limit);
          const searchMetaData = paginate(
            limit,
            offset,
            nextOffset,
            previousOffset,
            result);
          res.status(200).json({ searchMetaData, paginatedUsers });
        });
    } else {
      res.status(200).json({ searchMetaData: {}, paginatedUsers: [] });
    }
  }

  /**
   * This method is used for google authentication to create account for
   * the user
   * @param {req} req
   * @param {res} res
   * @return {obj} Returns user token if a user is created
   */
  static googleAuth(req, res) {
    const name = req.body.name, username = req.body.username.toLowerCase(),
      email = req.body.email;
    User.findOne({ where: { email } }).then((user) => {
      if (!user) {
        User.sync({ force: false }).then(() => {
          User.create({ name, username, email }).then((userDetail) => {
            const payload = {
              username: userDetail.username,
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
                message: 'Oops, operation failed. Username exist already'
              });
            }
          });
        });
      } else {
        const payload = {
          username: user.dataValues.username,
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

