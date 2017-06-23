import jasmine from 'jasmine';
import Sequelize from 'sequelize';
import expect from 'expect';
import Users from '../models/users';
import Group from '../models/group';
// import GroupMembers from '../models/groupMembers';
// import Messages from '../models/messages';
import db from '../config/db_url.json';


describe('Model test suite', () => {
  beforeEach((done) => {
    const sequelize = new Sequelize(db.url);
    sequelize.authenticate().then(() => { console.log('Connection established'); })
    .catch((err) => { console.log('Error occured', err); });
    done();
  }, 10000);
  it('I should be able to create a new user with this model', (done) => {
    Users.sync({ force: true }).then(() => {
      Users.create({ name: 'Peter', username: 'Ike', email: 'alobam@gmail.com', password: 'show' })
      .then((user) => {
        if (user) {
          expect('Ike').toBe(user.dataValues.username);
        }
        done();
      }).catch((err) => { console.log('Failed', err); done(); });
    });
  }, 10000);
  it('I should be able to create a new group with this model', (done) => {
    Group.sync({ force: true }).then(() => {
      Group.create({ groupName: 'Zikites', groupCategory: 'Class of 2014', userId: 1 })
      .then((group) => {
        if (group) {
          expect('Zikites').toNotBe('Zike');
          expect('Class of 2014').toBe(group.dataValues.groupCategory);
        }
        done();
      });
    }).catch((err) => { console.log('Failed', err); });
  }, 10000);
 /* it('I should be able to add users to group I created', (done) => {
    GroupMembers.sync({ force: true }).then(() => {
      GroupMembers.create({ userId: 1, admin: 1, groupId: 1 })
      .then((members) => {
        if (members) {
          expect(1).toBe(members.dataValues.userId);
        }
        done();
      });
    }).catch((err) => {
      console.log('Failed', err);
    });
  }, 10000);*/
});

