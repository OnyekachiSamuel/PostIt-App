import { GROUP_MESSAGE_SUCCESS, VIEW_POST_SUCCESS, GROUP_MESSAGE_FAILURE } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {obj} This reducer handles uodating the state
 * with group posts fetched from api call.
 *  Here the state is reduced based on the action object and
 *  a new start returned
 */
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
