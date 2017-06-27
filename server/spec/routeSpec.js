import supertest from 'supertest';
import jasmine from 'jasmine';
import { expect } from 'chai';
// import app from '../app';
import app from '../app';


const request = supertest(app);


describe('Test routes', () => {
  describe('POST /api/signup', () => {
    it('Should return a json object with success message', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: 'Bona', email: 'jcf@gmail.com', password: 'azundu' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.username === 'Bona');
          done(err);
        });
    }, 10000);
  });
  describe('POST /api/group', () => {
    it('Should return an object containing the group created details', (done) => {
      request.post('/api/group')
        .send({ groupName: 'Andela Tech Group', groupCategory: 'Tech', userId: 1 })
        .expect(200)
        .end((err, res) => {
          expect(res.body.groupName === 'Andela Tech Group');
          done(err);
        });
    }, 10000);
  });
  describe('POST /api/group/:groupId/user', () => {
    it('Should return a success message', (done) => {
      request.post('/api/group/:groupId/user')
        .send({ admin: 1, userId: 1, groupId: 1 })
        .end((err, res) => {
          expect(res.body.message !== null && res.body.status === 'Success');
          done(err);
        });
    }, 10000);
  });
  describe('POST /api/group/:groupId/messages', () => {
    it('Should return a success message ', (done) => {
      request.post('/api/group/1/messages')
        .send({ groupId: 1, userId: 1, message: 'I am just testing you out' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status === 'Success' && res.body.message === 'I am just testing you out');
          done(err);
        });
    }, 10000);
  });
  describe('GET /api/group/:groupId/mesages', () => {
    it('Should return a success message', (done) => {
      request.get('/api/group/1/messages')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message === 'I am just testing you out');
          done(err);
        });
    }, 10000);
  });
});



