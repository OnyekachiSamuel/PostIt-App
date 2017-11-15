import { GROUP_CREATION_SUCCESS, FETCH_USER_GROUPS } from '../actions/actionTypes';

/**
 * This reducer handles updating the state
 * group creation detail or failure detail.
 * @param {obj} state
 * @param {obj} action
 * @return {array} Here the state is reduced based on the action object and
 *  a new start returned
 */
const groupReducer = (state = [], action) => {
  switch (action.type) {
    case GROUP_CREATION_SUCCESS:
      return [...state, action.payload];
    case FETCH_USER_GROUPS:
      return [...action.payload.groups];
    default:
      return state;
  }
};

export default groupReducer;
