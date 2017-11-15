import { signUpFailure } from '../../actions/signUpAction';
import signUpReducer from '../../reducers/signUpReducer';
import { googleAuthFailure } from '../../actions/googleAction';
import { createGroupFailure } from '../../actions/groupAction';
import mockData from '../../__mocks__/reducersMockData';

describe('SignUp reducer', () => {
  it('should update the state on SIGN_UP_FAILURE', () => {
    const initialState = {};
    const action = signUpFailure(mockData.signUpFailure.payload);
    const newState = signUpReducer(initialState, action);
    expect(newState.message).toEqual('Username already exist.');
  });

  it('should update the state on GOOGLE_AUTH_FAILURE ', () => {
    const initialState = {};
    const action = googleAuthFailure(mockData.googleAuthFailure.payload);
    const newState = signUpReducer(initialState, action);
    expect(newState.message).toEqual('Oops, something went wrong. Username exist already');
  });

  it('should update the state on GROUP_CREATION_FAILURE ', () => {
    const initialState = {};
    const action = createGroupFailure(mockData.groupCreationFailure.payload);
    const newState = signUpReducer(initialState, action);
    expect(newState.message).toEqual('Group already exist');
  });

  it('should return default state when no action Type is matched', () => {
    const newState = signUpReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
