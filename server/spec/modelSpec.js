import jasmine from 'jasmine';
import expect from 'expect';
import Users from '../models/users';
import Group from '../models/group';
import GroupMembers from '../models/groupMembers';
import Messages from '../models/messages';


// TESTING all the models used in the application
describe('Model test suite', () => {
  beforeAll((done) => {
    Users.destroy({ where: {} }, { truncate: true }).then((destroyed) => {
      if (destroyed) {
        console.log('Done deleting');
      }
      done();
    });
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
      Group.create({ groupName: 'Zikites', description: 'Class of 2015', userId: 1 })
        .then((group) => {
          expect('Zikites').toNotBe('Zike');
          expect('Class of 2015').toBe(group.dataValues.description);
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

