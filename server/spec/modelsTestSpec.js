import jasmine from 'jasmine';
import Sequelize from 'sequelize';
import { expect } from 'chai';
import Users from '../models/users';
import Group from '../models/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';
import db from '../config/test_db_url.json';




describe('Models test suite', () => {
  describe('Establish connection to the database', () => {
    beforeAll((done) => {
      const sequelize = new Sequelize(db.url);
      sequelize.authenticate().then(() => {
        console.log('Connected');
          // 'Connected';
      }).catch((err) => {
        if (err) {
          return 'Unable to connect';
        }
      });
      done();
    });
  });
  describe('Users model', () => {
    beforeEach((done) => {
      const User = Users.sync({ force: true }).then(() => {
        Users.create({ name: 'Ebuka', username: 'Bonachristi', email: 'bona@gmail.com', password: 'samodu' })
          .then((result) => {
            if (result) {
              return 'Registered';
            }
          }).catch((err) => {
            if (err) {
              return 'Failed';
            }
          });
      });
      it('should be able to create a new account', () => {
        expect(User).to.be.a('Registered');
        done();
      });
    });
  });
  describe('Create a new group', () => {
    beforeEach((done) => {
      const CreateGroup = Group.sync({ force: true }).then(() => {
        Group.create({}).then((group) => {
          if (group) {
            return 'Group Created';
          }
        }).catch((err) => {
          if (err) {
            return 'Error occured, group not created';
          }
        });
      });
      it('Registered users should be able to create a group', () => {
        expect(CreateGroup).to.be.a('Group Created');
        done();
      });
    });
  });
  describe('Add registered users to group', () => {
    beforeEach((done) => {
      const AddMembers = GroupMembers.sync({ force: true }).then(() => {
        GroupMembers.create({}).then((users) => {
          if (users) {
            return 'Added';
          }
        }).catch((err) => {
          if (err) {
            return 'Failed';
          }
        });
      });
      it('Users should be added by groups by registered user', () => {
        expect(AddMembers).to.be.a('Added');
        done();
      });
    });
  });
  describe('A user should be able to post messages to groups he created', () => {
    beforeEach((done) => {
      const post = Messages.sync({ force: true }).then(() => {
        Messages.create({}).then((message) => {
          if (message) {
            return 'Posted';
          }
        }).catch((err) => {
          if (err) {
            return 'Failed';
          }
        });
      });
      it('Should be able to post message to group', () => {
        expect(post).to.be.a('Posted');
        done();
      });
    });
  });
});
