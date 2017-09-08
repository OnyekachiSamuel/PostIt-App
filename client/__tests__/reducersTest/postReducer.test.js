import { postedMessage } from '../../actions/postAction';
import postReducer from '../../reducers/postReducer';
import { fetchPostSuccess } from'../../actions/fetchPostAction';

describe('Post message reducer', () => {
  it('should update the state on POST_MESSAGE_SUCCESSFUL', () => {
    const data =  {
          groupId: 90,
          message: 'I am coming',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'
        }
    const initialState = {};
    const action = postedMessage(data);
    const newState = postReducer(initialState, action);
    expect(newState[0]).toEqual(data);
  });
  it('should update the state on FETCH_POST_SUCCESS', () => {
    const data = [{
          groupId: 90,
          message: 'I am coming',
          priority: 'Normal',
          createdAt: '2017-09-05T22:47:28.183Z',
          username: 'obinna'
        }]
    const initialState = {};
    const action = fetchPostSuccess(data);
    const newState = postReducer(initialState, action);
    expect(newState).toEqual(data);
  });
  it('should return default state when no action Type is matched', () => {
    const newState = postReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toEqual({});
  });
});
