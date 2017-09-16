import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/archiveMessage';
import { ARCHIVE_MESSAGE_SUCCESS } from '../../actions/actionTypes';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Archive message success', () => {
  it('should dispatch ARCHIVE_MESSAGE_SUCCESS action', async () => {
    const groupId = 5;
    const response = {
      status: 200,
      data: {
        data: [],
        groupCreator: true
      }
    };
    const expectedAction = {
      type: ARCHIVE_MESSAGE_SUCCESS,
      payload: {
        data: [],
        groupCreator: true
      }
    };
    axios.put = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    await store.dispatch(actions.archiveMessageRequest(groupId)).then(() => {
      const action = store.getActions();
      expect(action[0].type).toEqual(ARCHIVE_MESSAGE_SUCCESS);
      expect(action[0]).toEqual(expectedAction);
    });
  });
});
