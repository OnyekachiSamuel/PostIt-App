import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMembersRequest } from '../../actions/fetchMembers';
import { FETCH_MEMBERS } from '../../actions/actionTypes';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH MEMBERS ACTION', () => {
  it('should dispatch FETCH_MEMBERS action', (done) => {
    const groupId = '33';
    const response = {
      status: 200,
      data: {
        allUsers: [{ username: 'Ken' }, { username: 'Peter' }]
      }
    };
    const expectedAction = {
      type: FETCH_MEMBERS,
      payload: {
        allUsers: [{ username: 'Ken' }, { username: 'Peter' }]
      }
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(response);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    store.dispatch(fetchMembersRequest(groupId)).then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual(expectedAction);
    });
    done();
  });
});
