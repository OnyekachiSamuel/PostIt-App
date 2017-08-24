import expect from 'expect';
import signinReducer from '../../reducers/signInReducer';
import { signIn } from '../../actions/signInAction';
import { signUp } from '../../actions/signUpAction';
import { signout } from '../../actions/signOutAction';

describe('Sign In Reducer', () => {
  it('should update the state on SIGN_UP_SUCCESS', () => {
    const userData = {
      username: 'Samuel',
      password: 'sam',
    };
    const initialState = {};
    const action = signUp(userData);
    const newState = signinReducer(initialState, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.username).toBe('Samuel');
    expect(newState.user.password).toBe('sam');
  });
  it('should update the state on SIGN_IN_SUCCESS', () => {
    const payload = {
      userData: {
        username: 'Samuel',
        password: 'sam',
      }
    };
    const initialState = {};
    const action = signIn(payload);
    const newState = signinReducer(initialState, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user.userData.username).toBe('Samuel');
    expect(newState.user.userData.password).toBe('sam');
  });
  it('should update the state on SIGN_OUT_SUCCESS', () => {
    const initialState = {};
    const userData = {
      isAuthenticated: false,
      username: 'Samuel',
      password: 'sam',
      isLoggedOut: true
    };
    const action = signout(userData);
    const newState = signinReducer(initialState, action);
    expect(newState.user.isAuthenticated).toBe(false);
  });
  it('should return default state when no action Type is matched', () => {
    const newState = signinReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toContain({});
  });
});
