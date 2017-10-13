import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/signInAction';
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from '../../__mocks__/actionsMockData';


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
  it('should dispatch SIGN_IN_SUCCESS action on successful request', async () => {
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
      payload: mockData.signIn.payload
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignInRequest(mockData.signIn.userData))
    .then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_IN_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });

  it('should dispatch SIGN_IN_FAILURE action on failed request', async () => {
    const expectedAction = {
      type: SIGN_IN_FAILURE,
      payload: 'Invalid password'
    };
    axios.post = jest.fn(() => {
      return Promise.reject(mockData.signIn.res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignInRequest(mockData.signIn.userData1))
    .then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_IN_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
