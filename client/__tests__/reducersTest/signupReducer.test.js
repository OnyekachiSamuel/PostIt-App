import expect from 'expect';
import signupReducer from '../../reducers/signupReducer';
import { signupFailure } from '../../actions/signupAction';


describe('SignUp reducer for failure', () => {
  it('should update the state on SIGN_UP_FAILURE', () => {
    const payload = {
      message: 'User already exist'
    };
    const initialState = {
      message: ''
    };
    const action = signupFailure(payload);
    const newState = signupReducer(initialState, action);
    expect(newState.message).toBe('User already exist');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = signupReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toContain({});
  });
});
