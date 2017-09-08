import { createGroupSuccess, createGroupFailure } from '../../actions/groupAction';
import { fetchUserGroups } from '../../actions/fetchUserGroups'
import groupReducer from '../../reducers/groupReducer';

describe('Create group reducer', () => {
  it('should update the state on CREATE_GROUP_REQUEST', () => {
    const data = {
          groupId: 67,
          groupName: 'Andela team 6',
          description: 'The winning team'
        }
    const initialState = {};
    const action = createGroupSuccess(data);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupId).toEqual(67);
    expect(newState[0].groupName).toEqual('Andela team 6');
  });
  it('should update the state on FETCH_USER_GROUPS', () => {
    const data = {
      groups: [{
          groupId: 67,
          groupName: 'Andela team 6',
          description: 'The winning team'
        }]
    }
    const initialState = {};
    const action = fetchUserGroups(data);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupId).toEqual(67);
    expect(newState[0].groupName).toEqual('Andela team 6');
  });
  it('should update the state on GROUP_CREATION_FAILURE', () => {
    const data = {
              errors: 'Group exists already'
        }
    const initialState = {};
    const action = createGroupFailure(data);
    const newState = groupReducer(initialState, action);
    expect(newState.errors).toEqual('Group exists already')
  });
  it('should return default state when no action Type is matched', () => {
    const newState = groupReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});