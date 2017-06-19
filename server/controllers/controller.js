import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
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
          Users.create({
            name, username, email, password: hash
          }).then((User) => {
            res.status(200).json({
              status: 'success',
              data: User,
              message: 'Account created'
            });
          }).catch((err) => {
            next(err);
          });
        });
      });
    });
  }

  static signin(req, res, next) {
    passport.use(new LocalStrategy(
      (username, password, done) => {
        Users.findOne({ username }, (err, user) => {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
      Users.findById(id, (err, user) => {
        done(err, user);
      });
    });
  }

  /* static validPassword(password, databasePassword) {
    return bcrypt.compareSync(password, databasePassword);
  }*/

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

