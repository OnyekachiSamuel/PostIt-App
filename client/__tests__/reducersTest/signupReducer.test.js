import expect from 'expect';
import signinReducer from '../../reducers/signinReducer';
import signupReducer from '../../reducers/signupReducer';
import { signUp, signupFailure } from '../../actions/signupAction';


describe('SignUp reducer', () => {
  // it('should update the state on SIGN_UP_SUCCESS', () => {
  //   const payload = {
  //     name: 'Sami',
  //     username: 'Sami',
  //     email: 'sami@gmail.com',
  //     password: 'sami',
  //     confirmPassword: 'sami'
  //   };
  //   const initialState = {
  //     userData: {}
  //   };
  //   const action = signUp(payload);
  //   const newState = signinReducer(initialState, action);
  //   console.log(newState);
  //   expect(newState.userData.name).toBe('Sami');
  //   expect(newState.userData.username).toBe('Sami');
  //   expect(newState.userData.email).toBe('sami@gmail.com');
  //   expect(newState.userData.password).toBe('sami');
  //   expect(newState.userData.confirmPassword).toBe('sami');
  // });
  it('should update the state on SIGN_UP_FAILURE', () => {
    const userData = {
      message: 'User already exist'
    };
    const initialState = {
      message: ''
    };
    const action = signupFailure(userData);
    const newState = signupReducer(initialState, action);
    expect(newState.message).toBe('User already exist');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = signinReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toContain({});
  });
});
