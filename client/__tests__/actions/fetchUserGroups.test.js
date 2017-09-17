import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { FETCH_USER_GROUPS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH USER GROUPS ACTION', () => {
  it('should dispatch FETCH_USER_GROUPS action', async () => {
    const userId = '33';
    const response = {
      status: 200,
      data: {
        data: [{ groupName: 'Teencode', decription: 'Building the future tech leads' },
        { groupName: 'Code for fun', description: 'Raising funds for charity' }]
      }
    };
    const expectedAction = {
      type: FETCH_USER_GROUPS,
      payload: {
        data: [{ groupName: 'Teencode', decription: 'Building the future tech leads' },
        { groupName: 'Code for fun', description: 'Raising funds for charity' }]
      }
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchUserGroupRequest(userId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_USER_GROUPS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
