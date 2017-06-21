import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config';
import Users from '../models/users';
import Group from '../models/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';


/**
 * @class ApiController
 */
export default class ApiController {
  /**
   * @constructor
   */
  constructor() {
    this.sequelize = new Sequelize(config.url);
    this.sequelize.authenticate().then(() => { console.log('Connection has been established'); })
      .catch((err) => { console.error('Unable to connect to the database'); });
  }
  /**
 * Users details are captured by this method on signup and persisted on the database
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {JSON} Returns success or failure message with the data
 *
 */
  static signup(req, res, next) {
    const name = req.body.name,
      username = req.body.username,
      email = req.body.email,
      password = req.body.password;
    return Users.sync({ force: true }).then(() => {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          Users.create({ name, username, email, password: hash })
          .then(() => Users.findOrCreate({ where: { username } }))
          .spread((user, created) => {
            if (created) {
              res.status(200).json({ status: 'Username is already taken' });
            } else {
              res.status(200).json({ status: 'Account created' });
            }
          }).catch((err) => {
            next(err);
          });
         /* Users.create({
            name, username, email, password: hash
          }).then((User) => {
            res.status(200).json({
              status: 'success',
              data: User,
              message: 'Account created'
            });
          }).catch((err) => {
            next(err);
          });*/
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
  static signin(req, res, next) {
    const username = req.body.username,
      password = req.body.password;
    Users.findOne({ where: { username } }).then((response) => {
      if (response.dataValues.username === username) {
        const check = bcrypt.compareSync(password, response.dataValues.password);
        if (check) {
          res.status(200).json({
            status: 'Success',
            data: response,
            message: 'Logged In'
          });
        } else {
          res.status(401).json({ status: 'Invalid Password' });
        }
      }
    }).catch((err) => {
      res.status(401).json({ status: 'Invalid password or Username' });
      next(err);
    });
  }

  /**
 * This method is used for creating groups
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success or failure message with data
 */
  static createGroup(req, res, next) {
    return Group.sync({ force: true }).then(() => {
      Group.create(req.body).then((group) => {
        res.status(200).json({
          status: 'success',
          data: group,
          message: 'Group Created'
        });
      }).catch((err) => {
        next(err);
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
  static groups(req, res, next) {
    return GroupMembers.sync({ force: true }).then(() => {
      GroupMembers.create(req.body).then((data) => {
        res.status(200).json({
          status: 'success',
          data,
          message: 'User/Users added'
        });
      }).catch((err) => {
        next(err);
      });
    });
  }

  /**
 *
 * @param {obj} req
 * @param {obj} res
 * @param {obj} next
 * @return {obj} Returns success message with data or failure message
 */
  static messages(req, res, next) {
    return Messages.sync({ force: true }).then(() => {
      Messages.create(req.body).then((content) => {
        res.status(200).json({
          status: 'success',
          data: content,
          message: 'Message sent'
        });
      }).catch((err) => {
        next(err);
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
  static getMessages(req, res, next) {
    const groupId = req.params.groupId;
    Messages.findAll({
      where: {
        groupId
      }
    }).then((result) => {
      res.status(200).json({
        status: 'Success',
        data: result,
        message: 'Message received'
      });
    }).catch((err) => {
      next(err);
    });
  }
}

