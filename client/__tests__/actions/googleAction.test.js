import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/googleAction';
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAILURE } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';

const middleware = [thunk];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQ3ODQ3NDYsImV4cCI6MTUwNDg3MTE0Nn0.Uad3SxnImwsXnjFI6ECTlSMt8Cpxamn0jD9NrlMxlW0';
const mockStore = configureMockStore(middleware);
window.localStorage = localStorageMock;
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/group'
});

describe('GOOGLE SIGN IN ACTION', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch GOOGLE_AUTH_SUCCESS action', async () => {
    const userData = {
      name: 'henry',
      username: 'henry',
      email: 'henry@gmail.com'
    };
    const response = {
      status: 200,
      data: {
        token
      }
    };
    const expectedAction = {
      type: GOOGLE_AUTH_SUCCESS,
      payload: {
        username: 'henry',
        userId: 42,
        email: 'henry@gmail.com',
        name: 'Henry',
        iat: 1504784746,
        exp: 1504871146
      }
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.googleAuthRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(GOOGLE_AUTH_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should dispatch GOOGLE_AUTH_FAILURE action', async () => {
    const userData = {
      name: 'henry',
      username: 'henry',
      email: 'henry@gmail.com'
    };
    const res = {
      status: 200,
      response: {
        data: {
          message: 'Oops, operation failed. Username exist already'
        }
      }
    };
    const expectedAction = {
      type: GOOGLE_AUTH_FAILURE,
      payload: 'Oops, operation failed. Username exist already'
    };
    axios.post = jest.fn(() => {
      return Promise.reject(res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.googleAuthRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(GOOGLE_AUTH_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
