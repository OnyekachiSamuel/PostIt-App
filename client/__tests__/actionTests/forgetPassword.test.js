import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgetPasswordRequest, resetPasswordRequest } from '../../actions/forgetPasswordAction';
import { RESET_LINK_SUCCESS, PASSWORD_RESET_SUCCESS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTY2NjgsImV4cCI6MTUwNDQ4MzA2OH0.-vPaGB4OsnJc8e_Ini4nq4COog71q-zh1EAIim35GOw';


describe('FORGET PASSWORD ACTION', () => {
  it('SHOULD UPDATE THE STORE STATE ON RESET_LINK_SUCCESS ACTION', async () => {
    const userEmail = 'ezeokesam@gmail.com';
    const response = {
      status: 200,
      data: {
        message: 'Check your email and use the link to reset your password'
      }
    };
    const expectedAction = {
      type: RESET_LINK_SUCCESS,
      payload: 'Check your email and use the link to reset your password'
    };
    axios.post = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(forgetPasswordRequest(userEmail)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(RESET_LINK_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
  describe('FORGET PASSWORD ACTION', () => {
    it('SHOULD UPDATE THE STORE STATE ON RESET_LINK_SUCCESS ACTION', async () => {
      const response = {
        status: 200,
        data: {
          message: 'You have successfully resetted your password.'
        }
      };
      const expectedAction = {
        type: PASSWORD_RESET_SUCCESS,
        payload: 'You have successfully resetted your password.'
      };
      axios.put = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(resetPasswordRequest(token)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(PASSWORD_RESET_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
});
