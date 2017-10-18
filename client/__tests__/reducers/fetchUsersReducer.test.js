import { fetchUsers } from '../../actions/fetchUsers';
import fetchUsersReducer from '../../reducers/fetchUsersReducer';
import mockData from '../../__mocks__/reducersMockData';

describe('Fetch  User Reducer', () => {
  it('should update the state on FETCH_USERS_SUCCESS', () => {
    const initialState = {};
    const action = fetchUsers(mockData.fetchUsers.payload);
    const newState = fetchUsersReducer(initialState, action);
    expect(newState.pageCount).toEqual(9);
    expect(newState.pagenatedUsers[0].id).toEqual(2);
    expect(newState.pagenatedUsers[0].username).toEqual('Samuel');
    expect(newState.pagenatedUsers[1].id).toEqual(4);
    expect(newState.pagenatedUsers[1].username).toEqual('Ken');
    expect(newState.pagenatedUsers[2].id).toEqual(8);
    expect(newState.pagenatedUsers[2].username).toEqual('Jane');
  });

  it('should return default state when no action Type is matched', () => {
    const newState = fetchUsersReducer([], {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual([]);
  });
});
