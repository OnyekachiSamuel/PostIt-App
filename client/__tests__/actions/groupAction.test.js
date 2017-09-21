import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createGroupRequest, fetchGroupUsers } from '../../actions/groupAction';
import { GROUP_CREATION_SUCCESS, FETCH_USERS_ID, GROUP_CREATION_FAILURE } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('ACTION TEST FOR', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  describe('CREATE GROUP', () => {
    it('should dispatch GROUP_CREATION_SUCCESS action', async () => {
      const groupData = {
        groupName: 'Andela team 6',
        description: 'The winning team'
      };
      const response = {
        status: 200,
        data: {
          data: {
            groupId: 67,
            groupName: 'Andela team 6',
            description: 'The winning team'
          },
          message: 'Group successfully created'
        }
      };
      const expectedAction = {
        type: GROUP_CREATION_SUCCESS,
        userData: {
          groupId: 67,
          groupName: 'Andela team 6',
          description: 'The winning team'
        }
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(response);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(createGroupRequest(groupData)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(GROUP_CREATION_SUCCESS);
        expect(action[0]).toEqual(expectedAction);
      });
    });
    it('should dispatch GROUP_CREATION_FAILURE action', async () => {
      const groupData = {
        groupName: 'Andela team 6',
        description: 'The winning team'
      };
      const res = {
        status: 200,
        response: {
          data: {
            message: 'Group exist already'
          }
        }
      };
      const expectedAction = {
        type: GROUP_CREATION_FAILURE,
        errors: 'Group exist already'
      };
      axios.post = jest.fn(() => {
        return Promise.reject(res);
      });
      const store = mockStore({ payload: {} }, expectedAction);
      await store.dispatch(createGroupRequest(groupData)).then(() => {
        const action = store.getActions();
        expect(action[0].type).toEqual(GROUP_CREATION_FAILURE);
        expect(action[0]).toEqual(expectedAction);
      });
    });
  });
  describe('FETCH GROUP USERS ACTION', () => {
    it('should dispatch FETCH_USERS_ID action', async () => {
      const groupId = 9;
      const res = {
        status: 200,
        data: {
          userIds: [{ userId: 7 }, { userId: 8 }, { userId: 10 }]
        }
      };
      const expectedAction = {
        type: FETCH_USERS_ID,
        payload: [7, 8, 10]
      };
      axios.post = jest.fn(() => {
        return Promise.resolve(res);
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
