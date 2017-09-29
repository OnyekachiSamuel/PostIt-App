import { postedMessage } from '../../actions/postAction';
import postReducer from '../../reducers/postReducer';
import { fetchPostSuccess } from '../../actions/fetchPostAction';
import mockData from '../../__mocks__/reducersMockData';

describe('Post message reducer', () => {
  it('should update the state on POST_MESSAGE_SUCCESSFUL', () => {
    const initialState = {};
    const action = postedMessage(mockData.postMessage.payload);
    const newState = postReducer(initialState, action);
    expect(newState[0]).toEqual(mockData.postMessage.payload);
  });
  it('should update the state on FETCH_POST_SUCCESS', () => {
    const initialState = {};
    const action = fetchPostSuccess(mockData.fetchPost.payload);
    const newState = postReducer(initialState, action);
    expect(newState).toEqual(mockData.fetchPost.payload);
  });
  it('should return default state when no action Type is matched', () => {
    const newState = postReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
