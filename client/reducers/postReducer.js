import { POST_MESSAGE_SUCCESSFUL, FETCH_POST_SUCCESS } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {array} This reducer handles the update of
 * the state with posted message making it available.
 *  Here the state is reduced based on the action object and
 *  a new start returned
 */
const postReducer = (state = [], action) => {
  switch (action.type) {
    case POST_MESSAGE_SUCCESSFUL:
      return [action.payload, ...state];
    case FETCH_POST_SUCCESS:
      return [...action.payload];
    default:
      return state;
  }
};

export default postReducer;
