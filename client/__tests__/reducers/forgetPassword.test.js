import { sendResetLinkSuccess, passwordResetSuccess } from '../../actions/forgetPasswordAction';
import forgetPasswordReducer from '../../reducers/forgetPasswordReducer';

describe('Forget password reducer', () => {
  it('should update the state on RESET_LINK_SUCCESS', () => {
    const message = 'Check your email and use the link to reset your password';
    const initialState = {};
    const action = sendResetLinkSuccess(message);
    const newState = forgetPasswordReducer(initialState, action);
    expect(newState.message)
    .toEqual('Check your email and use the link to reset your password');
  });

  it('should update the state on PASSWORD_RESET_SUCCESS', () => {
    const message = 'You have successfully resetted your password.';
    const initialState = {};
    const action = passwordResetSuccess(message);
    const newState = forgetPasswordReducer(initialState, action);
    expect(newState.message).toEqual('You have successfully resetted your password.');
  });

  it('should return default state when no action Type is matched', () => {
    const newState = forgetPasswordReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
