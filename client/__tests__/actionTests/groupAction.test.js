import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createGroupRequest } from '../../actions/groupAction';
import { GROUP_CREATION_SUCCESS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('CREATE GROUP ACTION', () => {
  it('SHOULD UPDATE THE STATE ON GROUP_CREATION_SUCCESS ACTION', async () => {
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
});
