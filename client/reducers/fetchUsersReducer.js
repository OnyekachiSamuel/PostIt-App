import { FETCH_USERS_SUCCESS } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {obj}
 * This reducer handles updating the state with fetched users details
 *  Here the state is reduced based on the action object and
 *  a new start returned
 */
const fetchUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default fetchUsersReducer;
