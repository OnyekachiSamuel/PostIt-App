import supertest from 'supertest';
import jasmine from 'jasmine';
import { expect } from 'chai';
import app from '../app';

const request = supertest(app);


describe('Unit tests for the models that powers the application', () => {
  describe('Test for users signup endpoint', () => {
    it('Should return a json object containing the users information or error message', (done) => {
      request.post('/api/signup')
        .send({ name: 'Eze', username: 'Bona', email: 'jcf@gmail.com', password: 'azundu'})
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.username === 'Bona');
          done(err);
        });
    });
  });
  describe('Test for users to create groups', () => {
    it('Should return a json containing the group created details', (done) => {
      request.post('/api/group')
        .send({ groupName: 'Andela Tech Group', groupCategory: 'Tech', userId: 2})
        .expect(200)
        .end((err, res) => {
          expect(res.body.groupName === 'Andela Tech Group');
          done(err);
        });
    });
  });
  describe('Test for users to add members to a group', () => {
    it('Should return a json object containing details of the addition', (done) => {
      request.post('/api/group/2/user')
        .send({ groupId: 2, user: 1 })
        .end((err, res) => {
          expect(res.body.message !== null && res.body.status === 'Success');
          done(err);
        });
    });
  });
  describe('Test for a user to post message to a group', () => {
    it('Should return a success message and the message posted if successful', (done) => {
      request.post('/api/group/2/messages')
        .send({ groupId: 2, userId: 2, message: 'I am just testing you out' })
        .expect(200)
        .end((err, res) => {
          expect(res.body.status === 'Success' && res.body.message === 'I am just testing you out');
          done(err);
        });
    });
  });
  describe('Test to retrieve messages posted to group', () => {
    it('Should return the message posted in the group', (done) => {
      request.get('/api/group/2/messages')
        .expect(200)
        .end((err, res) => {
          expect(res.body.message === 'I am just testing you out');
          done(err);
        });
    });
  });
});



