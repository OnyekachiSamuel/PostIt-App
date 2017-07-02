import supertest from 'supertest';
import jasmine from 'jasmine';
import expect from 'expect';
import app from '../app';
import Users from '../models/users';

const request = supertest(app);

describe('ROUTE TESTING ', () => {
  beforeAll((done) => {
    Users.destroy({ where: {} }).then((destroyed) => {
      if (destroyed) {
        console.log('Done deleting');
      }
      done();
    });
  });
  describe('SIGNUP', () => {
    it('Should be able to create a new account', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: 'Kenet', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('success').toBe(res.body.status);
          expect('Account created').toBe(res.body.message);
          expect('Jane').toNotBe(res.body.data.name);
          expect('Kenet').toBe(res.body.data.username);
          done(err);
        });
    }, 10000);
  });
  describe('SIGNIN AND PERFORM OPERATIONS', () => {
    let token;
    it('Should be able to login to account created', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          token = res.body.token;
          expect(res.body.status).toBe('Success');
          expect(res.body.data.username).toBe('Kenet');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should be able to create group by registered user', (done) => {
      request.post('/api/group')
      .set('x-access-token', token)
      .send({ groupName: 'Andela21', groupCategory: 'Full stack with js', userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Group Created').toBe(res.body.message);
        done();
      });
    }, 16000);
    it('Should be able to add a user to groups', (done) => {
      request.post('/api/group/1/user')
      .set('x-access-token', token)
      .send({ admin: 1, userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('User/Users added').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should be able to post message to created group', (done) => {
      request.post('/api/group/1/messages')
      .set('x-access-token', token)
      .expect(200)
      .send({ message: 'Its working', priority: 'Normal', userId: 1 })
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Message sent').toBe(res.body.message);
        expect(1).toBe(res.body.data.userId);
        expect('Normal').toBe(res.body.data.priority);
        expect('Its working').toBe(res.body.data.message);
        done();
      });
    }, 10000);
    it('Should be able to post another message to group', (done) => {
      request.post('/api/group/1/messages')
      .set('x-access-token', token)
      .expect(200)
      .send({ message: 'Its pretty cool we consider React in this project', priority: 'Normal', userId: 1 })
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Message sent').toBe(res.body.message);
        expect(1).toBe(res.body.data.userId);
        expect('Normal').toBe(res.body.data.priority);
        expect('Its pretty cool we consider React in this project').toBe(res.body.data.message);
        done();
      });
    }, 10000);
    it('Should be able to get messages in a particular group', (done) => {
      request.get('/api/group/1/messages')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        expect('Its pretty cool we consider React in this project').toBe(res.body.data[0].message);
        expect('Normal').toBe(res.body.data[0].priority);
        expect(1).toBe(res.body.data[0].groupId);
        expect(1).toBe(res.body.data[0].userId);
        done();
      });
    }, 1000);
  });
  describe('NEGATIVE TESTS', () => {
    let token2;
    it('Should NOT be able to login with wrong username', (done) => {
      request.post('/api/signin')
        .send({ username: 'enet', password: 'azundu' })
        .end((err, res) => {
          expect(res.body.status).toBe('User not found');
          done(err);
        });
    }, 10000);
    it('Should NOT be able to login with wrong username', (done) => {
      request.post('/api/signin')
        .send({ username: 'enet', password: 'azundu' })
        .end((err, res) => {
          expect('User not found').toBe(res.body.status);
          done(err);
        });
    }, 10000);
    it('Should NOT be able to login with wrong password', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'zundu' })
        .end((err, res) => {
          expect('Invalid Password').toBe(res.body.status);
          done(err);
        });
    }, 10000);
    it('Should be able to login to account created', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          token2 = res.body.token;
          expect(res.body.status).toBe('Success');
          expect(res.body.data.username).toBe('Kenet');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
    it('Should NOT be able to create group without group name', (done) => {
      request.post('/api/group')
      .set('x-access-token', token2)
      .send({ groupCategory: 'Full stack with js', userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('Invalid input type').toBe(res.body.status);
        done();
      });
    }, 16000);
    it('Should NOT be able add user to others group', (done) => {
      request.post('/api/group/4/user')
      .set('x-access-token', token2)
      .send({ admin: 1, userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('Invalid input type').toBe(res.body.status);
        done();
      });
    }, 10000);
    it('Should NOT be able to post empty message to group', (done) => {
      request.post('/api/group/1/messages')
      .set('x-access-token', token2)
      .expect(200)
      .send({ priority: 'Normal', userId: 1 })
      .end((err, res) => {
        expect('Input need not be empty').toBe(res.body.status);
        done();
      });
    }, 10000);
    it('Should NOT be able to post message with wrong token', (done) => {
      const token3 = 'hhgggUUjjkkkK';
      request.post('/api/group/1/messages')
      .set('x-access-token', token3)
      .expect(200)
      .send({ priority: 'Normal', userId: 1 })
      .end((err, res) => {
        expect('Failed to authenticate token.').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should be denied access to route without token', (done) => {
      request.post('/api/group/1/messages')
      .expect(200)
      .send({ priority: 'Normal', userId: 1 })
      .end((err, res) => {
        expect('Access denied. Login first').toBe(res.body.message);
        done();
      });
    }, 10000);
    it('Should NOT create account without submitting all form data', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', email: 'jyyyu@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect('Input field required').toBe(res.body.status);
          done(err);
        });
    }, 10000);
  });
});




