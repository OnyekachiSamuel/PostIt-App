import { sendResetLinkSuccess, passwordResetSuccess, sendResetLinkFailure, passwordResetFailure } from '../../actions/forgetPasswordAction';
import forgetPassword from '../../reducers/forgetPasswordReducer';

describe('forget password reducer', () => {
  it('should update the state on RESET_LINK_SUCCESS', () => {
    const data =  {
         message: 'Check your email and use the link to reset your password'
      }
    const initialState = {};
    const action = sendResetLinkSuccess(data.message);
    const newState = forgetPassword(initialState, action);
    expect(newState.message).toBe('Check your email and use the link to reset your password');
  });
  it('should update the state on RESET_LINK_FAILURE', () => {
    const data =  {
         message: 'User does not exist'
      }
    const initialState = {};
    const action = sendResetLinkFailure(data.message);
    const newState = forgetPassword(initialState, action);
    expect(newState.error).toBe('User does not exist');
  });
  it('should update the state on PASSWORD_RESET_SUCCESS', () => {
    const data =  {
         message: 'You have successfully resetted your password'
      }
    const initialState = {};
    const action = passwordResetSuccess(data.message);
    const newState = forgetPassword(initialState, action);
    expect(newState.message).toBe('You have successfully resetted your password');
  });
  it('should update the state on PASSWORD_RESET_FAILURE', () => {
    const data =  {
         message: 'Password mismatch. Retype your password'
      }
    const initialState = {};
    const action = passwordResetFailure(data.message);
    const newState = forgetPassword(initialState, action);
    expect(newState.error).toBe('Password mismatch. Retype your password');
  });
});
