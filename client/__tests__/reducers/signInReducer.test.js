import { signIn } from '../../actions/signInAction';
import signInReducer from '../../reducers/signInReducer';
import { signUp } from '../../actions/signUpAction';
import { googleAuthSuccess } from '../../actions/googleAction';
import { signout } from '../../actions/signOutAction';
import mockData from '../../__mocks__/reducersMockData';

describe('SignIn reducer', () => {
  it('should update the state on SIGN_IN_SUCCESS ', () => {
    const initialState = {};
    const action = signIn(mockData.signIn.payload);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(mockData.signIn.payload);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should update the state on SIGN_UP_SUCCESS ', () => {
    const initialState = {};
    const action = signUp(mockData.signUp.payload);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(mockData.signUp.payload);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should update the state on GOOGLE_AUTH_SUCCESS ', () => {
    const initialState = {};
    const action = googleAuthSuccess(mockData.googleSignUp.payload);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual(mockData.googleSignUp.payload);
    expect(newState.isAuthenticated).toEqual(true);
  });

  it('should update the state on SIGNOUT_SUCCESS ', () => {
    const initialState = {};
    const action = signout(mockData.signOut.payload);
    const newState = signInReducer(initialState, action);
    expect(newState.user).toEqual({});
  });

  it('should return default state when no action Type is matched', () => {
    const newState = signInReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
