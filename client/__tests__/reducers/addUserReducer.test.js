import { addUserSuccess, addUserFailure } from '../../actions/addUserAction';
import addUserReducer from '../../reducers/addUserReducer';

describe('Add User Reducer', () => {
  it('should update the state on ADD_USER_SUCCESS', () => {
    const data = {
      status: 'success',
      message: 'User successfully added'
    };
    const initialState = {};
    const action = addUserSuccess(data);
    const newState = addUserReducer(initialState, action);
    expect(newState.status).toEqual('success');
    expect(newState.message).toEqual('User successfully added');
  });
  it('should update the state on ADD_USER_FAILURE', () => {
    const data = {
      status: 'failed',
      message: 'User already exist'
    };
    const initialState = {};
    const action = addUserFailure(data);
    const newState = addUserReducer(initialState, action);
    expect(newState.status).toEqual('failed');
    expect(newState.message).toEqual('User already exist');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = addUserReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
