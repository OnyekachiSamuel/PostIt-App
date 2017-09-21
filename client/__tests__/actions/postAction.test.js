import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postRequest } from '../../actions/postAction';
import { POST_MESSAGE_SUCCESSFUL, POST_MESSAGE_FAILURE } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('MESSAGE POST ACTION', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should dispatch POST_MESSAGE_SUCCESSFUL action', async () => {
    const userData = {
      message: 'Good to go',
      priority: 'Normal'
    };
    const response = {
      status: 200,
      data: {
        data: {
          groupId: 90,
          message: 'Good to go',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'

        }
      },
      message: 'Received'
    };
    const expectedAction = {
      type: POST_MESSAGE_SUCCESSFUL,
      payload: {
        groupId: 90,
        message: 'Good to go',
        priority: 'Normal',
        createdAt: '2017-09-05T22:47:28.183Z',
        username: 'obinna'
      }
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(postRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(POST_MESSAGE_SUCCESSFUL);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  it('should dispatch POST_MESSAGE_FAILURE action', async () => {
    const userData = {
      message: 'Good to go',
      priority: 'Normal'
    };
    const res = {
      status: 200,
      response: {
        data: {
          errors: {
            message: 'Whitespace character is not allowed'
          }
        }
      }
    };
    const expectedAction = {
      type: POST_MESSAGE_FAILURE,
      payload: 'Whitespace character is not allowed'
    };
    axios.post = jest.fn(() => {
      return Promise.reject(res);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(postRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(POST_MESSAGE_FAILURE);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});