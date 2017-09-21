import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgetPasswordRequest, resetPasswordRequest } from '../../actions/forgetPasswordAction';
import { RESET_LINK_SUCCESS, PASSWORD_RESET_SUCCESS, RESET_LINK_FAILURE, PASSWORD_RESET_FAILURE } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTY2NjgsImV4cCI6MTUwNDQ4MzA2OH0.-vPaGB4OsnJc8e_Ini4nq4COog71q-zh1EAIim35GOw';


describe('ACTION TEST FOR', () => {
  describe('PASSWORD RESET ', () => {
    it('should dispatch RESET_LINK_SUCCESS action', async () => {
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
    it('should dispatch RESET_LINK_FAILURE action', async () => {
      const res = {
        status: 200,
        response: {
          data: {
            message: 'User not found'
          }
        }
      };
      const expectedAction = {
        type: RESET_LINK_FAILURE,
        payload: 'User not found'
      };
      axios.post = jest.fn(() => {
        return Promise.reject(res);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(forgetPasswordRequest(token)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(RESET_LINK_FAILURE);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('PASSWORD RESET', () => {
    it('should dispatch PASSWORD_RESET_SUCCESS action', async () => {
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
    it('should dispatch PASSWORD_RESET_FAILURE action', async () => {
      const res = {
        status: 200,
        response: {
          data: {
            message: 'Password mismatch. Type in a new password'
          }
        }
      };
      const expectedAction = {
        type: PASSWORD_RESET_FAILURE,
        payload: 'Password mismatch. Type in a new password'
      };
      axios.put = jest.fn(() => {
        return Promise.reject(res);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(resetPasswordRequest(token)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(PASSWORD_RESET_FAILURE);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
});
