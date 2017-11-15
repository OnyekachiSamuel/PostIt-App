import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUsersRequest } from '../../actions/fetchUsers';
import { FETCH_USERS_SUCCESS } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH USERS ACTION', () => {
  it('should dispatch FETCH_USERS_SUCCEES action on successful request', async () => {
    const userData = {
      offset: 0,
      search: 'adam'
    };
    const expectedAction = {
      type: FETCH_USERS_SUCCESS,
      payload: mockData.fetchUsers.payload
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(mockData.fetchUsers.response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchUsersRequest(userData)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_USERS_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
