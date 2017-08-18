import { createGroupSuccess, createGroupFailure } from '../../actions/groupAction';
import { fetchGroup } from '../../actions/fetchGroup';
import groupReducer from '../../reducers/groupReducer';

describe('Group Reducer', () => {
  it('should update the state on GROUP_CREATION_SUCCESS', () => {
    const data = {
      groupName: 'Isengard',
      description: 'Team of life'
    };
    const initialState = {
      message: '',
      description: ''
    };
    const action = createGroupSuccess(data);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupName).toBe('Isengard');
    expect(newState[0].description).toBe('Team of life');
  });
  it('should update the state on GROUP_CREATION_FAILURE', () => { 
    const data = {
      errors: 'Group already exist'
    };
    const initialState = {};
    const action = createGroupFailure(data);
    const newState = groupReducer(initialState, action);
    expect(newState.errors).toBe('Group already exist');
  });
  it('should update the state on FETCH_GROUP_SUCCESS', () => {
    const groupData = {
      data: {
        groups: [
          {
            groupName: 'Team 2',
            description: 'All best'
          },
          {
            groupName: 'Team 3',
            description: 'Hope for Africa'
          },
          {
            groupName: 'Team 4',
            description: 'Programming for fun'
          }
        ]
      }
    };
    const initialState = [];
    const action = fetchGroup(groupData);
    const newState = groupReducer(initialState, action);
    expect(newState[0].groupName).toBe('Team 2');
    expect(newState[0].description).toBe('All best');
    expect(newState[1].groupName).toBe('Team 3');
    expect(newState[1].description).toBe('Hope for Africa');
    expect(newState[2].groupName).toBe('Team 4');
    expect(newState[2].description).toBe('Programming for fun');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = groupReducer([], {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual([]);
  });
});
