import { signIn } from '../../actions/signInAction';
import signInReducer from '../../reducers/signInReducer';
import { signUp } from '../../actions/signUpAction';
import { googleAuthSuccess } from '../../actions/googleAction';
import { signout } from '../../actions/signOutAction';

describe('SignIn reducer', () => {
  it('should update the state on SIGN_IN_SUCCESS ', () => {
    const data = {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    };
    const initialState = {};
    const action = signIn(data);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(data);
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should update the state on SIGN_UP_SUCCESS ', () => {
    const data = {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    };
    const initialState = {};
    const action = signUp(data);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(data);
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should update the state on GOOGLE_AUTH_SUCCESS ', () => {
    const data = {
      username: 'henry',
      userId: 42,
      email: 'henry@gmail.com',
      name: 'Henry',
      iat: 1504396668,
      exp: 1504483068
    };
    const initialState = {};
    const action = googleAuthSuccess(data);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(data);
    expect(newState.isAuthenticated).toEqual(true);
  });
  it('should update the state on SIGNOUT_SUCCESS ', () => {
    const data = {};
    const initialState = {};
    const action = signout(data);
    const newState = googleAuthSuccess(initialState, action);
    expect(newState.payload).toEqual({});
  });
  it('should return default state when no action Type is matched', () => {
    const newState = signInReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
