import supertest from 'supertest';
import jasmine from 'jasmine';
import expect from 'expect';
import app from '../app';

const request = supertest(app);

describe('Test routes', () => {
  describe('POST /api/signup', () => {
    it('Should return a signup data', (done) => {
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
  describe('POST /api/signin', () => {
    it('Should not be able to login with wrong password', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'yayyaya' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).toBe('Invalid Password');
          done(err);
        });
    }, 10000);
    it('Should not be able to login with wrong credential', (done) => {
      request.post('/api/signin')
        .send({ username: 'Keneta', password: 'kachi' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).toBe('Invalid password or Username');
          done(err);
        });
    }, 10000);
    it('Should be able to login to account created', (done) => {
      request.post('/api/signin')
        .send({ username: 'Kenet', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).toBe('Success');
          expect(res.body.data.username).toBe('Kenet');
          expect(res.body.message).toBe('Logged In');
          done(err);
        });
    }, 10000);
  });
  describe('POST /api/group', () => {
    it('Should be able to create group by registered user', (done) => {
      request.post('/api/group')
      .send({ groupName: 'Andela21', groupCategory: 'Full stack with js', userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Group Created').toBe(res.body.message);
        done();
      });
    }, 10000);
  });
  describe('POST /api/group/1/user', () => {
    it('Should be able to add a user to groups', (done) => {
      request.post('/api/group/1/user')
      .send({ admin: 1, userId: 1 })
      .expect(200)
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('User/Users added').toBe(res.body.message);
        done();
      });
    }, 10000);
  });
  describe('POST /group/1/messages', () => {
    it('Should be able to post message to created group', (done) => {
      request.post('/api/group/1/messages')
      .expect(200)
      .send({ message: 'This is ANDELA', priority: 'Normal', userId: 1, groupId: 1 })
      .end((err, res) => {
        expect('success').toBe(res.body.status);
        expect('Message sent').toBe(res.body.message);
        expect(1).toBe(res.body.data.userId);
        expect('Normal').toBe(res.body.data.priority);
        expect('This is ANDELA').toBe(res.body.data.message);
        done();
      });
    }, 10000);
  });
  describe('GET /api/group/:groupId/messages', () => {
    it('Should be able to get messages in a particular group', (done) => {
      request.get('/api/group/1/messages')
      .expect(200)
      .end((err, res) => {
        expect('This is ANDELA').toBe(res.body.data[0].message);
        expect('Normal').toBe(res.body.data[0].priority);
        expect(1).toBe(res.body.data[0].groupId);
        expect(1).toBe(res.body.data[0].userId);
        done();
      });
    }, 1000);
  });
});




