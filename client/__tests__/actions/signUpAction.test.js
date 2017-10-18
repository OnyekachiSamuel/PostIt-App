import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/signUpAction';
import { SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTM0NjIsImV4cCI6MTUwNDQ3OTg2Mn0.xuDJd-NUXg8--utHKOTFPiTv7s8HMOy9QRl61QoxSws';
const mockStore = configureMockStore(middleware);
window.localStorage = localStorageMock;
Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/group'
});
describe('Sign Up action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });

  it('should dispatch SIGN_UP_SUCCESS action on successful request', async () => {
    const response = {
      status: 200,
      message: 'Account created',
      data: {
        token
      }
    };
    const expectedAction = {
      type: SIGN_UP_SUCCESS,
      payload: mockData.signUp.payload
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignUpRequest(mockData.signUp.userData))
    .then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_UP_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });

  it('should dispatch SIGN_UP_FAILURE action on failed request', async () => {
    const res = {
      status: 200,
      response: {
        data: {
          message: 'Username exist already'
        }
      }
    };
    const expectedAction = {
      type: SIGN_UP_FAILURE,
      payload: {
        message: 'Username exist already'
      }
    };
    axios.post = jest.fn(() => {
      return Promise.reject(res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.userSignUpRequest(mockData.signUp.userData2))
    .then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(SIGN_UP_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
