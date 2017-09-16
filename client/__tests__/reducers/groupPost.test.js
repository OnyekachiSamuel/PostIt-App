import { fetchPost } from '../../actions/fetchGroupPost';
import groupPostReducer from '../../reducers/groupPostReducer';

describe('Fetch group post reducer', () => {
  it('should update the state on GROUP_MESSAGE_SUCCESS', () => {
    const data = {
      data: [],
      groupCreator: true
    };
    const initialState = {};
    const action = fetchPost(data);
    const newState = groupPostReducer(initialState, action);
    expect(newState.data).toEqual([]);
    expect(newState.groupCreator).toBe(true);
  });
  it('should return default state when no action Type is matched', () => {
    const newState = groupPostReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
