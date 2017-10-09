import { FETCH_MEMBERS } from '../actions/actionTypes';

/**
 *
 * @param {array} state
 * @param {obj} action
 * @return {obj}
 *  This reducer handles updating the state with fetched group members details
 *  Here the state is reduced based on the action object and
 *  a new start returned
 */
const fetchMembersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return [...action.payload.allUser];
    default:
      return state;
  }
};

export default fetchMembersReducer;
