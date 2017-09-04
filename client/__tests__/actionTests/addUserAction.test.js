import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addUserRequest } from '../../actions/addUserAction';
import { ADD_USER_SUCCESS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Add user action', () => {
  it('SHOULD CREATE ADD_USER_SUCCESS ACTION', (done) => {
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
