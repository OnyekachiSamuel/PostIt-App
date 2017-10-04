import { GROUP_MESSAGE_SUCCESS, VIEW_POST_SUCCESS, GROUP_MESSAGE_FAILURE } from '../actions/actionTypes';

const groupPostReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_MESSAGE_SUCCESS:
      return { ...action.payload };
    case GROUP_MESSAGE_FAILURE:
      return { ...action.payload };
    case VIEW_POST_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default groupPostReducer;
