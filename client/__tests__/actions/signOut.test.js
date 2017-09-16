import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/signOutAction';
import { SIGN_OUT_SUCCESS } from '../../actions/actionTypes';
import localStorageMock from '../../__mocks__/localStorageMock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
window.localStorage = localStorageMock;
const setAuthorizationToken = jest.fn();
setAuthorizationToken(false);

describe('Sign out action', () => {
  it('should dispatch SIGN_OUT_SUCCESS action', async () => {
    const expectedAction = {
      type: SIGN_OUT_SUCCESS,
      payload: {}
    };
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.signOutRequest());
    const action = store.getActions();
    expect(action[0].type).toEqual(SIGN_OUT_SUCCESS);
    expect(action[0]).toEqual(expectedAction);
  });
});
