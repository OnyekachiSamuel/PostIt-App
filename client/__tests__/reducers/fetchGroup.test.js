import { fetchMembers } from '../../actions/fetchMembers';
import fetchGroupMembers from '../../reducers/fetchGroupMembers';

describe('Fetch members reducer', () => {
  it('should update the state on FETCH_MEMBERS', () => {
    const data = {
      allUser: [{ username: 'Ken' }, { username: 'Peter' }]
    };
    const initialState = {};
    const action = fetchMembers(data);
    const newState = fetchGroupMembers(initialState, action);
    expect(newState.length).toEqual(2);
    expect(newState[0].username).toEqual('Ken');
    expect(newState[1].username).toEqual('Peter');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = fetchMembers({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState.payload).toEqual({});
  });
});
