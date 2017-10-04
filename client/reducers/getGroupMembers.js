import { FETCH_USERS_ID, GROUP_MEMBERS_UPDATE } from '../actions/actionTypes';

const initialState = [];
const getGroupMembers = (state = initialState, action) => {
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
