import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/signInAction';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';

const middleware = [thunk];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTY2NjgsImV4cCI6MTUwNDQ4MzA2OH0.-vPaGB4OsnJc8e_Ini4nq4COog71q-zh1EAIim35GOw';
const mockStore = configureMockStore(middleware);
window.localStorage = localStorageMock;
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/group'
});

describe('Sign in action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch SIGN_IN_SUCCESS action', async () => {
    const userData = {
      username: 'henry',
      password: 'hen'
    };
    const response = {
      status: 200,
      email: 'henry@gmail.com',
      userId: 42,
      username: 'henry',
      data: {
        token
      }
    };
    const expectedAction = {
      type: SIGN_IN_SUCCESS,
      payload: {
        username: 'henry',
        userId: 42,
        email: 'henry@gmail.com',
        name: 'Henry',
        iat: 1504396668,
        exp: 1504483068
      }
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignInRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_IN_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should dispatch SIGN_IN_FAILURE action', async () => {
    const userData = {
      username: 'henry',
      password: 'hen'
    };
    const res = {
      status: 200,
      response: {
        data: {
          message: 'Invalid password'
        }
      }
    };
    const expectedAction = {
      type: SIGN_IN_FAILURE,
      payload: 'Invalid password'
    };
    axios.post = jest.fn(() => {
      return Promise.reject(res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignInRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_IN_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
