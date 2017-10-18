import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPostRequest } from '../../actions/fetchPostAction';
import { FETCH_POST_SUCCESS } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH POST ACTION', () => {
  it('should dispatch FETCH_POST_SUCCESS action on successful request', async () => {
    const groupId = '33',
      userId = 89;
    const expectedAction = {
      type: FETCH_POST_SUCCESS,
      payload: mockData.fetchPost.payload
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(mockData.fetchPost.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchPostRequest(groupId, userId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_POST_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
