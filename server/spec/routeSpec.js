import supertest from 'supertest';
import jasmine from 'jasmine';
import expect from 'expect';
import app from '../app';
import User from '../models/user';
import mockData from '../__mockData__/testData';

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
      request.post('/api/v1/signup')
        .send(mockData.signUp[0])
        .expect(200)
        .end((err, res) => {
          expect('200').toEqual(res.status);
          expect('Account created').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should be able to create another account', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[1])
        .expect(200)
        .end((err, res) => {
          expect('200').toEqual(res.status);
          expect('Account created').toBe(res.body.message);
          done(err);
        });
    }, 10000);
  });
  describe('SIGNUP/ NEGATIVE TEST', () => {
    it('Should not be able to create a new account with empty input fields', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[2])
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
      request.post('/api/v1/signup')
        .send(mockData.signUp[3])
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.name);
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account without any field', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[4])
        .expect(200)
        .end((err, res) => {
          expect('Name, Username, Email, Password and ConfirmPassword fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account with alphanumeric input in name and username fields', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[5])
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.name);
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to create account with existing records', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[6])
        .expect(200)
        .end((err, res) => {
          expect('Record exists already').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to create a new account with invalid email', (done) => {
      request.post('/api/v1/signup')
        .send(mockData.signUp[7])
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
      request.post('/api/v1/signin')
        .send(mockData.signIn[0])
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          userId = res.body.user.id;
          id = res.body.user.userId;
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should be able to create group by registered user', (done) => {
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(mockData.groupDetails[0])
        .expect(200)
        .end((err, res) => {
          groupId = res.body.group.groupId;
          expect(200).toBe(res.status);
          expect('Group successfully created').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should be able to add a user to a group', (done) => {
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(mockData.addUser[0])
        .expect(200)
        .end((err, res) => {
          expect('User successfully added').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should be able to get all members in a group', (done) => {
      request.post(`/api/v1/group/${groupId}/userIds`)
    .set('x-access-token', token)
    .expect(200)
    .end((err, res) => {
      const groupMembers = res.body.groupMembers;
      expect(groupMembers).toEqual(['obinna', 'kenet']);
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
          expect('Critical').toBe(res.body.post.priority);
          expect('Its working').toBe(res.body.post.message);
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
          expect('Normal').toBe(res.body.post.priority);
          expect('Its pretty cool we consider React in this project').toBe(res.body.post.message);
          done();
        });
    }, 10000);
    it('Should be able to get messages in a particular group', (done) => {
      request.get(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect('Its pretty cool we consider React in this project').toBe(res.body.posts[0].message);
          expect('Its working').toBe(res.body.posts[1].message);
          done();
        });
    }, 1000);
    it('Should be able to get users in a group', (done) => {
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
      request.get(`/api/v1/users?offset=${mockData.search.offset}&search=${mockData.search.name}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          const user1 = res.body.paginatedUsers[0];
          expect(user1.name).toBe('Obinna');
          expect(user1.username).toBe('obinna');
          done();
        });
    }, 1000);
    it('Should be able to signup with google', (done) => {
      request.post('/api/v1/auth/google')
        .send(mockData.google)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toBe('Account created');
          done();
        });
    }, 1000);
    it('Should be able to login with google', (done) => {
      request.post('/api/v1/auth/google')
        .send(mockData.googleLogin)
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
      request.get(`/api/v1/groups/user/${userId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body.groups[0].groupName).toBe('ANDELA21');
          done();
        });
    }, 1000);
    it('Should be able to get user messages', (done) => {
      request.get(`/api/v1/posts/${groupId}/${userId}`)
        .set('x-access-token', token)
        .expect(200)
        .end((err, res) => {
          const data = res.body.posts[0];
          expect(data.message).toBe('Its pretty cool we consider React in this project');
          done();
        });
    }, 1000);
  });
  describe('NEGATIVE TESTS', () => {
    let token, groupId;
    it('Should be able to login to account created', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[1])
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          expect(200).toBe(res.status);
          expect(res.body.user.username).toBe('obinna');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should be able to create group by registered user', (done) => {
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(mockData.groupDetails[1])
        .expect(200)
        .end((err, res) => {
          groupId = res.body.group.groupId;
          expect(200).toBe(res.status);
          expect('Group successfully created').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should NOT be able to login with wrong username', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[2])
        .end((err, res) => {
          expect('User not found').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should NOT be able to login with wrong password', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[3])
        .end((err, res) => {
          expect('Invalid Password').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with a missing field', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[4])
        .expect(200)
        .end((err, res) => {
          expect('Username and Password fields are required').toBe(res.body.message);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with empty input fields', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[5])
        .expect(200)
        .end((err, res) => {
          expect('Username field should not be empty').toBe(res.body.errors.username);
          expect('Password field should not be empty').toBe(res.body.errors.password);
          done(err);
        });
    }, 10000);
    it('Should not be able to login with number as username', (done) => {
      request.post('/api/v1/signin')
        .send(mockData.signIn[6])
        .expect(200)
        .end((err, res) => {
          expect('Only alphabets are allowed in this field').toBe(res.body.errors.username);
          done(err);
        });
    }, 10000);
    it('Should not be able to post message with missing input fields', (done) => {
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(mockData.post[0])
        .end((err, res) => {
          expect('Message field is required').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should not be able to post message with empty input fields', (done) => {
      request.post(`/api/v1/group/${groupId}/messages`)
        .set('x-access-token', token)
        .expect(200)
        .send(mockData.post[1])
        .end((err, res) => {
          expect('Whitespace characters is not allowed. Please type in a message.').toBe(res.body.errors.message);
          done();
        });
    }, 10000);
    it('Should not be able to create group with missing fields', (done) => {
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(mockData.groupDetails[2])
        .expect(200)
        .end((err, res) => {
          expect('Group name field is required').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should not be able to create group with empty input fields', (done) => {
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(mockData.groupDetails[3])
        .expect(200)
        .end((err, res) => {
          expect('Group Name field should not be empty').toBe(res.body.errors.groupName);
          done();
        });
    }, 16000);
    it('Should not be able to create group with same groupName', (done) => {
      request.post('/api/v1/group')
        .set('x-access-token', token)
        .send(mockData.groupDetails[4])
        .expect(200)
        .end((err, res) => {
          expect('Group already exist').toBe(res.body.message);
          done();
        });
    }, 16000);
    it('Should not be able to add a user with empty input fields', (done) => {
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(mockData.addUser[1])
        .expect(200)
        .end((err, res) => {
          expect('Username field should not be empty').toBe(res.body.errors.username);
          done();
        });
    }, 10000);
    it('Should NOT be able to add non existing user to a group', (done) => {
      request.post(`/api/v1/group/${groupId}/user`)
        .set('x-access-token', token)
        .send(mockData.addUser[2])
        .expect(200)
        .end((err, res) => {
          expect('Username does not exits').toBe(res.body.message);
          done();
        });
    }, 10000);
    it('Should NOT be able to post message with wrong token', (done) => {
      request.post('/api/v1/group/1/messages')
        .set('x-access-token', mockData.token)
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
