import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postRequest } from '../../actions/postAction';
import { POST_MESSAGE_SUCCESSFUL, POST_MESSAGE_FAILURE } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('MESSAGE POST ACTION', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch POST_MESSAGE_SUCCESSFUL action', async () => {
    const expectedAction = {
      type: POST_MESSAGE_SUCCESSFUL,
      payload: mockData.postSuccess.payload
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(mockData.postSuccess.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(postRequest(mockData.postSuccess.userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(POST_MESSAGE_SUCCESSFUL);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should dispatch POST_MESSAGE_FAILURE action', async () => {
    const expectedAction = {
      type: POST_MESSAGE_FAILURE,
      payload: mockData.postFailure.payload
    };
    axios.post = jest.fn(() => {
      return Promise.reject(mockData.postFailure.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(postRequest(mockData.postFailure.userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(POST_MESSAGE_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
