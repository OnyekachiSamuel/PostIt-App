import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { FETCH_USER_GROUPS } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH USER GROUPS ACTION', () => {
  it('should dispatch FETCH_USER_GROUPS action', async () => {
    const userId = '33';
    const expectedAction = {
      type: FETCH_USER_GROUPS,
      payload: mockData.fetchUsersGroup.payload
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(mockData.fetchUsersGroup.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchUserGroupRequest(userId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_USER_GROUPS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
