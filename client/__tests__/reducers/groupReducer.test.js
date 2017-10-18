import { createGroupSuccess, createGroupFailure } from '../../actions/groupAction';
import { fetchUserGroups } from '../../actions/fetchUserGroups';
import groupReducer from '../../reducers/groupReducer';
import groupCreateFailure from '../../reducers/signUpReducer';
import mockData from '../../__mocks__/reducersMockData';

describe('Create group reducer', () => {
  it('should update the state on CREATE_GROUP_REQUEST', () => {
    const initialState = {};
    const action = createGroupSuccess(mockData.groupSuccess.payload);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupId).toEqual(67);
    expect(newState[0].groupName).toEqual('Andela team 6');
  });

  it('should update the state on FETCH_USER_GROUPS', () => {
    const initialState = {};
    const action = fetchUserGroups(mockData.userGroups.payload);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupId).toEqual(67);
    expect(newState[0].groupName).toEqual('Andela team 6');
  });

  it('should update the state on GROUP_CREATION_FAILURE', () => {
    const initialState = {};
    const action = createGroupFailure(mockData.groupFailure.payload);
    const newState = groupCreateFailure(initialState, action);
    expect(newState.data.message)
    .toEqual(mockData.groupFailure.payload.data.message);
  });

  it('should return default state when no action Type is matched', () => {
    const newState = groupReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
