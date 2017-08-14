import expect from 'expect';
import { postedMessage } from '../../actions/postAction';
import { fetchPostSuccess } from '../../actions/fetchPostAction';
import postReducer from '../../reducers/postReducer';

describe('Post Message Reducer', () => {
  it('should update the state on POST_MESSAGE_SUCCESS', () => {
    const data = {
      message: 'I am good to go',
      priority: 'Normal'
    };
    const initialState = {};
    const action = postedMessage(data);
    const newState = postReducer(initialState, action);
    expect(newState[0].message).toBe('I am good to go');
    expect(newState[0].priority).toBe('Normal');
  });
  it('should update the state on FETCH_MESSAGE_SUCCESS', () => {
    const data = [{
      message: 'I am good to go',
      priority: 'Normal'
    },
    {
      message: 'I need it now',
      priority: 'Urgent'
    },
    {
      message: 'Here is the bad guy, I need to call the police',
      priority: 'Critical'

    }
    ];
    const initialState = [];
    const action = fetchPostSuccess(data);
    const newState = postReducer(initialState, action);
    expect(newState[0].message).toBe('I am good to go');
    expect(newState[0].priority).toBe('Normal');
    expect(newState[1].message).toBe('I need it now');
    expect(newState[1].priority).toBe('Urgent');
    expect(newState[2].message).toBe('Here is the bad guy, I need to call the police');
    expect(newState[2].priority).toBe('Critical');
  });
  it('should return default state when no action Type is matched', () => {
    const newState = postReducer({}, {
      type: 'NO_ACTION_MATCH'
    });
    expect(newState).toContain([]);
  });
});
