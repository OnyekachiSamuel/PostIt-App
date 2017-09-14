import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPostRequest } from '../../actions/fetchPostAction';
import { FETCH_POST_SUCCESS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH POST ACTION', () => {
  it('SHOULD UPDATE THE STATE ON FETCH_POST_SUCCESS ACTION', async () => {
    const groupId = '33',
      userId = 89;
    const response = {
      status: 200,
      data: {
        data: [{
          groupId: 90,
          message: 'I am coming',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'

        }]
      },
      message: 'Received'
    };
    const expectedAction = {
      type: FETCH_POST_SUCCESS,
      payload: [{
        groupId: 90,
        message: 'I am coming',
        priority: 'Normal',
        createdAt: '2017-09-05T22:47:28.183Z',
        username: 'obinna'
      }]
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchPostRequest(groupId, userId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_POST_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
