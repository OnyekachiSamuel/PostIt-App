import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/googleAction';
import { GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAILURE } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';
import mockData from '../../__mocks__/actionsMockData';

const middleware = [thunk];
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
    const expectedAction = {
      type: GOOGLE_AUTH_SUCCESS,
      payload: mockData.googleSignUp.payload
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(mockData.googleSignUp.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.googleAuthRequest(mockData.googleSignUp.userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(GOOGLE_AUTH_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should dispatch GOOGLE_AUTH_FAILURE action', async () => {
    const expectedAction = {
      type: GOOGLE_AUTH_FAILURE,
      payload: mockData.googleFailure.payload
    };
    axios.post = jest.fn(() => {
      return Promise.reject(mockData.googleFailure.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.googleAuthRequest(mockData.googleFailure.userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(GOOGLE_AUTH_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
