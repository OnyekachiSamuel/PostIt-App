import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addUserRequest } from '../../actions/addUserAction';
import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Add user action', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch ADD_USER_SUCCESS action', (done) => {
    const username = 'Amanda';
    const groupId = '33';
    const response = {
      status: 200,
      data: {
        message: 'User successfully added'
      },
      response: {
        data: {
          message: 'Error occcured'
        }
      }
    };
    const expectedAction = {
      type: ADD_USER_SUCCESS,
      payload: {
        message: 'User successfully added'
      }
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
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
  it('should dispatch ADD_USER_FAILURE action', (done) => {
    const username = 'Amanda';
    const groupId = '33';
    const res = {
      status: 200,
      data: {
        message: 'User successfully added'
      },
      response: {
        data: {
          message: 'User already exists'
        }
      }
    };
    const expectedAction = {
      type: ADD_USER_FAILURE,
      payload: 'User already exists'
    };
    axios.post = jest.fn(() => {
      return Promise.reject(res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    store.dispatch(addUserRequest(username, groupId)).then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual(expectedAction);
    });
    done();
  });
});
