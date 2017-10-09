import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { forgetPasswordRequest, resetPasswordRequest } from '../../actions/forgetPasswordAction';
import { RESET_LINK_SUCCESS, PASSWORD_RESET_SUCCESS, RESET_LINK_FAILURE, PASSWORD_RESET_FAILURE } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbnJ5IiwidXNlcklkIjo0MiwiZW1haWwiOiJoZW5yeUBnbWFpbC5jb20iLCJuYW1lIjoiSGVucnkiLCJpYXQiOjE1MDQzOTY2NjgsImV4cCI6MTUwNDQ4MzA2OH0.-vPaGB4OsnJc8e_Ini4nq4COog71q-zh1EAIim35GOw';


describe('ACTION TEST FOR', () => {
  describe('PASSWORD RESET ', () => {
    it('should dispatch RESET_LINK_SUCCESS action', async () => {
      const userEmail = 'ezeokesam@gmail.com';
      const expectedAction = {
        type: RESET_LINK_SUCCESS,
        payload: mockData.resetLinkSuccess.payload
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(mockData.resetLinkSuccess.response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(forgetPasswordRequest(userEmail)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(RESET_LINK_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
    it('should dispatch RESET_LINK_FAILURE action', async () => {
      const expectedAction = {
        type: RESET_LINK_FAILURE,
        payload: mockData.resetLinkFailure.payload
      };
      axios.post = jest.fn(() => {
        return Promise.reject(mockData.resetLinkFailure.response);
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
      const expectedAction = {
        type: PASSWORD_RESET_SUCCESS,
        payload: mockData.passwordResetSuccess.payload
      };
      axios.put = jest.fn(() => {
        return Promise.resolve(mockData.passwordResetSuccess.response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(resetPasswordRequest(token)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(PASSWORD_RESET_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
    it('should dispatch PASSWORD_RESET_FAILURE action', async () => {
      const expectedAction = {
        type: PASSWORD_RESET_FAILURE,
        payload: mockData.passwordResetFailure.payload
      };
      axios.put = jest.fn(() => {
        return Promise.reject(mockData.passwordResetFailure.response);
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
