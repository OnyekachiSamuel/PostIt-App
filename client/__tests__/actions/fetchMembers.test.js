import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchMembersRequest } from '../../actions/fetchMembers';
import { FETCH_MEMBERS } from '../../actions/actionTypes';
import mockData from '../../__mocks__/actionsMockData';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('FETCH MEMBERS ACTION', () => {
  it('should dispatch FETCH_MEMBERS action on successful request', (done) => {
    const groupId = '33';
    const expectedAction = {
      type: FETCH_MEMBERS,
      payload: mockData.fetchMembers.payload[0]
    };
    axios.get = jest.fn(() => {
      return Promise.resolve(mockData.fetchMembers.response[0]);
    });
    const store = mockStore({ payload: {} }, expectedAction);
    store.dispatch(fetchMembersRequest(groupId)).then(() => {
      const action = store.getActions();
      expect(action[0]).toEqual(expectedAction);
    });
    done();
  });
});
