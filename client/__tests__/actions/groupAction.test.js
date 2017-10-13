import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createGroup, fetchGroupUsers } from '../../actions/groupAction';
import { GROUP_CREATION_SUCCESS, FETCH_USERS_ID, GROUP_CREATION_FAILURE } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('ACTION TEST FOR', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });

  describe('CREATE GROUP', () => {
    it('should dispatch GROUP_CREATION_SUCCESS action on successful request', async () => {
      const expectedAction = {
        type: GROUP_CREATION_SUCCESS,
        payload: mockData.createGroupSuccess.payload
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(mockData.createGroupSuccess.response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(createGroup(mockData.createGroupSuccess.groupData))
      .then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(GROUP_CREATION_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });

    it('should dispatch GROUP_CREATION_FAILURE action on failed request', async () => {
      const expectedAction = {
        type: GROUP_CREATION_FAILURE,
        errors: mockData.createGroupFailure.errors
      };
      axios.post = jest.fn(() => {
        return Promise.reject(mockData.createGroupFailure.response
        );
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(createGroup(mockData.createGroupFailure.groupData))
      .then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(GROUP_CREATION_FAILURE);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });

  describe('FETCH GROUP USERS ACTION', () => {
    it('should dispatch FETCH_USERS_ID action on successful request', async () => {
      const groupId = 9;
      const expectedAction = {
        type: FETCH_USERS_ID,
        payload: mockData.fetchGroupUsers.payload
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(mockData.fetchGroupUsers.response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(fetchGroupUsers(groupId)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(FETCH_USERS_ID);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
});
