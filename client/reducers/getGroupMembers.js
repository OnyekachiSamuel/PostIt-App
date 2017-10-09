import { FETCH_USERS_ID, GROUP_MEMBERS_UPDATE } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {obj}
 * This reducer handles updating the state with members that belongs
 * to same group.
 * Here the state is reduced based on the action object and
 *  a new start returned
 */
const getGroupMembers = (state = [], action) => {
  switch (action.type) {
    case FETCH_USERS_ID:
      return [...action.payload];
    case GROUP_MEMBERS_UPDATE:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

export default getGroupMembers;
