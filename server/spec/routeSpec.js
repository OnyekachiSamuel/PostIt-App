import supertest from 'supertest';
import jasmine from 'jasmine';
import expect from 'expect';
import app from '../app';
import User from '../models/user';

const request = supertest(app);

describe('ROUTE TESTING', () => {
  beforeAll((done) => {
    User.destroy({ where: {} }, { truncate: true }).then((destroyed) => {
      if (destroyed) {
        console.log('Done deleting');
      }
      done();
    });
  });
  describe('SIGNUP/ POSITIVE TEST', () => {
    it('Should be able to create a new account', (done) => {
      const user = {
        name: 'Obinna',
        username: 'Obinna',
        email: 'ezeokeonyekachi@gmail.com',
        phone: '07062489846',
        password: 'obinna',
        confirmPassword: 'obinna'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('200').toEqual(res.status);
          expect('Account created').toBe(res.body.message);
          expect('Jane').toNotBe(res.body.data.name);
          expect('obinna').toBe(res.body.data.username);
          done(err);
        });
    }, 10000);
    it('Should be able to create another account', (done) => {
      const user = {
        name: 'Eze',
        username: 'Kenet',
        email: 'ezeokesamuel@gmail.com',
        phone: '07062489846',
        password: 'azundu',
        confirmPassword: 'azundu'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('200').toEqual(res.status);
          expect('Account created').toBe(res.body.message);
          expect('Jane').toNotBe(res.body.data.name);
          expect('kenet').toBe(res.body.data.username);
          done(err);
        });
    }, 10000);
  });
  describe('SIGNUP/ NEGATIVE TEST', () => {
    it('Should not be able to create a new account with empty input fields', (done) => {
      const user = {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Name field should not be empty').toBe(res.body.errors.name);
          expect('Username field should not be empty').toBe(res.body.errors.username);
          expect('Email field should not be empty').toBe(res.body.errors.email);
          expect('Password field should not be empty').toBe(res.body.errors.password);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account with number as inputs in name and username field', (done) => {
      const user = {
        name: '35353',
        username: '666373',
        email: 'tstsys@gmail.com',
        phone: '07062489846',
        password: 'henk',
        confirmPassword: 'henk'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.name);
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account without any field', (done) => {
      const user = {
        username: 'Kenet',
        email: 'hshsh@gmail.com',
        password: 'azundu'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Name, Username, Email, Password and ConfirmPassword fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account with alphanumeric input in name and username fields', (done) => {
      const user = {
        name: '003838hhdhd',
        username: '00992jsjsj',
        email: 'hshsh@gmail.com',
        phone: '07062489846',
        password: 'azundu',
        confirmPassword: 'azundu'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.name);
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to create account with existing records', (done) => {
      const user = {
        name: 'Eze',
        username: 'Kenet',
        email: 'ken@gmail.com',
        phone: '07062489846',
        password: 'azundu',
        confirmPassword: 'azundu'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Record exists already').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account with invalid email', (done) => {
      const user = {
        name: 'Kenet',
        username: 'Kenet',
        email: 'hshs',
        phone: '07062489846',
        password: 'azundu',
        confirmPassword: 'azundu'
      };
      request.post('/api/v1/signup')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Email is invalid').toBe(res.body.errors.email);
          done(err);
        });
    }, 10000);
  });
  describe('SIGNIN OPERATIONS/POSITIVE TEST', () => {
    let userId;
    let token;
    let groupId;
    let user;
    let id;
    it('Should be able to login to account created', (done) => {
      user = {
        username: 'Kenet',
        password: 'azundu'
      };
      request.post('/api/v1/signin')
        .send(user)
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.data.id;
          id = res.body.data.userId;
          expect(res.body.data.username).toBe('kenet');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should be able to create group by registered user', (done) => {
      user = {
        groupName: 'ANDELA21',
        description: 'Full stack project discussion group'
      };
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          groupId = res.body.data.groupId;
          expect(200).toBe(res.status);
          expect('Group successfully created').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should be able to add a user to a group', (done) => {
      user = {
        username: 'obinna'
      };
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('User successfully added').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should be able to post message to created group', (done) => {
      user = {
        message: 'Its working',
        priority: 'Critical',
        userId: `${userId}`
      };
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(user)
        .end((err, res) => {
          expect(200).toBe(res.status);
          expect('Message sent').toBe(res.body.message);
          expect(userId).toBe(res.body.data.userId);
          expect('Critical').toBe(res.body.data.priority);
          expect('Its working').toBe(res.body.data.message);
          done();
        });
    }, 10000);
    it('Should be able to post another message to group', (done) => {
      user = {
        message: 'Its pretty cool we consider React in this project',
        priority: 'Normal',
        userId: `${userId}`
      };
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(user)
        .end((err, res) => {
          expect(200).toBe(res.status);
          expect('Message sent').toBe(res.body.message);
          expect(userId).toBe(res.body.data.userId);
          expect('Normal').toBe(res.body.data.priority);
          expect('Its pretty cool we consider React in this project').toBe(res.body.data.message);
          done();
        });
    }, 10000);
    it('Should be able to get messages in a particular group', (done) => {
      request.get(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect('Its pretty cool we consider React in this project').toBe(res.body.data[0].message);
          expect('Its working').toBe(res.body.data[1].message);
          done();
        });
    }, 1000);
    it('Should be able to users in a group', (done) => {
      request.get(`/api/v1/group/${groupId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          const user1 = res.body.allUser[0].username;
          const user2 = res.body.allUser[1].username;
          expect(user1).toBe('obinna');
          expect(user2).toBe('kenet');
          done();
        });
    }, 1000);
    it('Should be able to search for users', (done) => {
      const offset = 0,
        search = 'obinna';
      request.get(`/api/v1/users?offset=${offset}&search=${search}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          const pageCount = res.body.pageCount;
          const user1 = res.body.users[0];
          expect(pageCount).toBe(1);
          expect(user1.name).toBe('Obinna');
          expect(user1.phone).toBe('07062489846');
          done();
        });
    }, 1000);
    it('Should be able to signup with google', (done) => {
      const userData = {
        name: 'Henry',
        username: 'henry',
        email: 'henry@gmail.com'
      };
      request.post('/api/v1/auth/google')
        .send(userData)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe('Account created');
          done();
        });
    }, 1000);
    it('Should be able to login with google', (done) => {
      const userData = {
        name: 'Henry',
        username: 'henry',
        email: 'henry@gmail.com'
      };
      request.post('/api/v1/auth/google')
        .send(userData)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe('Logged In');
          done();
        });
    }, 1000);
    it('Should be able to get groups created by a user', (done) => {
      const username = 'kenet';
      request.get(`/api/v1/groups/${username}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          groupId = res.body.groups[0].groupId;
          const groupName = res.body.groups[0].groupName;
          expect(groupName).toBe('ANDELA21');
          done();
        });
    }, 1000);
    it('Should be able to get groups a user belongs to', (done) => {
      request.get(`/api/v1/groups/user/${id}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.groups[0].groupName).toBe('ANDELA21');
          done();
        });
    }, 1000);
    it('Should be able to get user messages', (done) => {
      request.get(`/api/v1/posts/${groupId}/${id}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          const data = res.body.data[0];
          expect(data.message).toBe('Its pretty cool we consider React in this project');
          expect(true).toBe(true);
          done();
        });
    }, 1000);
  });
  describe('NEGATIVE TESTS', () => {
    let token, user, groupId;
    it('Should be able to login to account created', (done) => {
      user = {
        username: 'obinna',
        password: 'obinna'
      };
      request.post('/api/v1/signin')
        .send(user)
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          expect(200).toBe(res.status);
          expect(res.body.data.username).toBe('obinna');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should be able to create group by registered user', (done) => {
      user = {
        groupName: 'Programming for fun',
        description: 'Full stack project discussion group'
      };
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          groupId = res.body.data.groupId;
          expect(200).toBe(res.status);
          expect('Group successfully created').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should NOT be able to login with wrong username', (done) => {
      user = {
        username: 'enet',
        password: 'azundu'
      };
      request.post('/api/v1/signin')
        .send(user)
        .end((err, res) => {
          expect('User not found').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should NOT be able to login with wrong password', (done) => {
      user = {
        username: 'Kenet',
        password: 'zundu'
      };
      request.post('/api/v1/signin')
        .send(user)
        .end((err, res) => {
          expect('Invalid Password').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with a missing field', (done) => {
      user = {
        password: 'azundu'
      };
      request.post('/api/v1/signin')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Username and Password fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with empty input fields', (done) => {
      user = {
        username: '',
        password: ''
      };
      request.post('/api/v1/signin')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Username field should not be empty').toBe(res.body.errors.username);
          expect('Password field should not be empty').toBe(res.body.errors.password);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with number as username', (done) => {
      user = {
        username: '838839',
        password: 'azundu'
      };
      request.post('/api/v1/signin')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to post message with missing input fields', (done) => {
      user = {
        priority: 'Normal',
      };
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(user)
        .end((err, res) => {
          expect('Message field is required').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should not be able to post message with empty input fields', (done) => {
      user = {
        message: '',
        priority: ''
      };
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(user)
        .end((err, res) => {
          expect('Whitespace characters is not allowed. Please type in a message.').toBe(res.body.errors.message);
          done();
        });
    }, 10000);
    it('Should not be able to create group with missing fields', (done) => {
      user = {
        description: 'Full stack with js'
      };
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Group name field is required').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should not be able to create group with empty input fields', (done) => {
      user = {
        groupName: '',
        description: ''
      };
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Group Name field should not be empty').toBe(res.body.errors.groupName);
          done();
        });
    }, 16000);
    it('Should not be able to create group with same groupName', (done) => {
      user = {
        groupName: 'Programming for fun',
        description: 'Full stack project discussion group'
      };
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Group already exist').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should not be able to add a user with empty input fields', (done) => {
      user = {
        username: ''
      };
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Username field should not be empty').toBe(res.body.errors.username);
          done();
        });
    }, 10000);
    it('Should NOT be able add non existing user to a group', (done) => {
      user = {
        username: 'Janet'
      };
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect('Username does not exits').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should NOT be able to post message with wrong token', (done) => {
      const token3 = 'hhgggUUjjkkkKddds';
      request.post('/api/v1/group/1/messages')
        .set('x-access-token', token3)
        .expect(200)
        .send({ message: 'Yea, its ok', priority: 'Normal' })
        .end((err, res) => {
          expect('Failed to authenticate token.').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should be denied access to route without token', (done) => {
      request.post('/api/v1/group/1/messages')
        .expect(200)
        .send({ message: 'Good to go', priority: 'Normal', userId: `${1}` })
        .end((err, res) => {
          expect('Access denied. Login first').toBe(res.body.message);
          done();
        });
    }, 10000);
  });
});
