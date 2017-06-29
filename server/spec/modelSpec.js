import jasmine from 'jasmine';
import Sequelize from 'sequelize';
import expect from 'expect';
import Users from '../models/tests/users';
import Group from '../models/tests/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';
import db from '../config/test_db_url.json';

// TESTING all the models used in the application
describe('Model test suite', () => {
  beforeAll((done) => {
    const sequelize = new Sequelize(db.url);
    sequelize.authenticate().then(() => { console.log('Connection established'); })
    .catch((err) => { console.log('Error occured', err); });
    done();
  });
  it('I should be able to create a new user with this model', (done) => {
    Users.sync({ force: true }).then(() => {
      Users.create({ name: 'Helen', username: 'Sam', email: 'aloba@gmail.com', password: 'showa' })
      .then((user) => {
        if (user) {
          expect('Sam').toBe(user.dataValues.username);
          expect('aloba@gmail.com').toBe(user.dataValues.email);
        }
        done();
      }).catch((err) => { done(err); });
    });
  }, 10000);
  it('I should be able to create a new group with this model', (done) => {
    Group.sync({ force: true }).then(() => {
      Group.create({ groupName: 'Zikites', groupCategory: 'Class of 2015', userId: 1 })
      .then((group) => {
        expect('Zikites').toNotBe('Zike');
        expect('Class of 2015').toBe(group.dataValues.groupCategory);
        expect(group.dataValues.userId.toString()).toBe('1');
        done();
      });
    }).catch((err) => { done(err); });
  }, 10000);
  it('I should be able to add users to group I created', (done) => {
    GroupMembers.sync({ force: true }).then(() => {
      GroupMembers.create({ userId: 1, admin: 1, groupId: 1 })
      .then((members) => {
        expect(members.dataValues.userId.toString()).toBe('1');
        expect(members.dataValues.admin.toString()).toBe('1');
        expect(members.dataValues.groupId.toString()).toBe('1');
        done();
      });
    }).catch((err) => {
      done(err);
    });
  }, 10000);
  it('I should be able to post message to groups with this model', (done) => {
    Messages.sync({ force: true }).then(() => {
      Messages.create({ message: 'I knew it will happened', userId: 1, groupId: 1 })
      .then((message) => {
        expect(message.dataValues.message).toBe('I knew it will happened');
        expect(message.dataValues.userId.toString()).toBe('1');
        expect(message.dataValues.groupId.toString()).toBe('1');
        done();
      });
    }).catch((err) => { done(err); });
  }, 10000);
});

