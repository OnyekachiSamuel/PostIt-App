import { POST_MESSAGE_SUCCESSFUL, FETCH_POST_SUCCESS } from '../actions/actionTypes';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case POST_MESSAGE_SUCCESSFUL:
      return [...state, action.payload];
    case FETCH_POST_SUCCESS:
    debugger;
    console.log(action.payload, '======its=====');
      return [...action.payload];
    default:
      return state;
  }
};

export default postReducer;
