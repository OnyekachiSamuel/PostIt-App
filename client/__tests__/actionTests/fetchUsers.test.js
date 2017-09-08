import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchUsersRequest } from '../../actions/fetchUsers';
import { FETCH_USERS_SUCCESS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH USERS ACTION', () => {
  it('SHOULD UPDATE THE STORE STATE ON FETCH_USERS_SUCCEES ACTION', async () => {
    const response = {
      data: {
        users: [
          { id: 34, username: 'Helen' },
          { id: 35, username: 'Adam' }

        ]
      }
    };
    const expectedAction = {
      type: FETCH_USERS_SUCCESS,
      payload: {
        data: {
          users: [
          { id: 34, username: 'Helen' },
          { id: 35, username: 'Adam' }
          ]
        }
      }
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(fetchUsersRequest()).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(FETCH_USERS_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
