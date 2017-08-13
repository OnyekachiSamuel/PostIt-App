import expect from 'expect';
import signinReducer from '../../reducers/signinReducer';
import { signIn } from '../../actions/signinAction';
import { signout } from '../../actions/signoutAction';

describe('Sign In Reducer', () => {
  it('should update the state on SIGN_IN_SUCCESS', () => {
    const userData = {
      username: 'Samuel',
      password: 'sam',
      isLoggedOut: false
    };
    const initialState = {};
    const action = signIn(userData);
    const newState = signinReducer(initialState, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.username).toBe('Samuel');
    expect(newState.user.password).toBe('sam');
  });
  it('should update the state on SIGN_OUT_SUCCESS', () => {
    const initialState = {};
    const userData = {
      username: 'Samuel',
      password: 'sam',
      isLoggedOut: true
    };
    const action = signout(userData);
    const newState = signinReducer(initialState, action);
    expect(newState.isLoggedOut).toBe(true);
  });
  it('should return default state when no action Type is matched', () => {
    const newState = signinReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toContain({});
  });
});
