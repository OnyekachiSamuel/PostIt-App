import { GROUP_MESSAGE_SUCCESS } from '../actions/actionTypes';

const groupPostReducer = (state = [], action) => {
  switch (action.type) {
    case GROUP_MESSAGE_SUCCESS:
      return [...action.payload.data];
    default:
      return state;
  }
};

export default groupPostReducer;
