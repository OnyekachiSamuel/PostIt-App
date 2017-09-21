import { fetchUsers } from '../../actions/fetchUsers';
import fetchUsersReducer from '../../reducers/fetchUsersReducer';

describe('Fetch  User Reducer', () => {
  it('should update the state on FETCH_USERS_SUCCESS', () => {
    const payload = {
      data: {
        pageCount: 9,
        users: [{ id: 2, username: 'Samuel' },
        { id: 4, username: 'Ken' }, { id: 8, username: 'Jane' }]
      }
    };
    const initialState = {};
    const action = fetchUsers(payload);
    const newState = fetchUsersReducer(initialState, action);
    expect(newState.pageCount).toEqual(9);
    expect(newState.users[0].id).toEqual(2);
    expect(newState.users[0].username).toEqual('Samuel');
    expect(newState.users[1].id).toEqual(4);
    expect(newState.users[1].username).toEqual('Ken');
    expect(newState.users[2].id).toEqual(8);
    expect(newState.users[2].username).toEqual('Jane');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = fetchUsersReducer([], {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual([]);
  });
});