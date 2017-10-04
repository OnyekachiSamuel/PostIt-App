import { fetchMembers } from '../../actions/fetchMembers';
import fetchGroupMembers from '../../reducers/fetchGroupMembers';
import mockData from '../../__mocks__/reducersMockData';

describe('Fetch members reducer', () => {
  it('should update the state on FETCH_MEMBERS', () => {
    const initialState = {};
    const action = fetchMembers(mockData.fetchMembers.data);
    const newState = fetchGroupMembers(initialState, action);
    expect(newState.length).toEqual(2);
    expect(newState[0].username).toEqual('Ken');
    expect(newState[1].username).toEqual('Peter');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = fetchGroupMembers({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
