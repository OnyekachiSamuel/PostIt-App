import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addUserRequest } from '../../actions/addUserAction';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Add user action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch ADD_USER_SUCCESS action on successful request', (done) => {
    const username = 'Amanda';
    const groupId = '33';
    const expectedAction = {
      type: ADD_USER_SUCCESS,
      payload: mockData.addUserAction.payload[1]
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(mockData.addUserAction.response[0]);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    store.dispatch(addUserRequest(username, groupId)).then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual(expectedAction);
    });
    done();
  });
});

describe('Add user action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch ADD_USER_FAILURE action on failed request', (done) => {
    const username = 'Amanda';
    const groupId = '33';
    const expectedAction = {
      type: ADD_USER_FAILURE,
      payload: mockData.addUserAction.payload[0]
    };
    axios.post = jest.fn(() => {
      return Promise.reject(mockData.addUserAction.response[1]);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    store.dispatch(addUserRequest(username, groupId)).then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual(expectedAction);
    });
    done();
  });
});
