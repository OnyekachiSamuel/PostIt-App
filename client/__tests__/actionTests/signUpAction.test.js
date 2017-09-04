import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/signUpAction';
import { SIGN_UP_SUCCESS } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';


const middleware = [thunk];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTM0NjIsImV4cCI6MTUwNDQ3OTg2Mn0.xuDJd-NUXg8--utHKOTFPiTv7s8HMOy9QRl61QoxSws';
const mockStore = configureMockStore(middleware);
// Mock the localstorage
window.localStorage = localStorageMock;
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/group'
});
describe('Sign Up action', () => {
  it('SHOULD CREATE SIGN_UP_SUCCESS ACTION', async () => {
    const user = {
      status: 200,
      id: 42,
      name: 'henry',
      username: 'hen',
      email: 'henry@gmail.com',
      data: {
        token
      }
    };
    const expectedAction = {
      type: SIGN_UP_SUCCESS,
      payload: {
        username: 'henry',
        userId: 42,
        email: 'henry@gmail.com',
        name: 'Henry',
        iat: 1504393462,
        exp: 1504479862
      }
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(user);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignUpRequest(user)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_UP_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});