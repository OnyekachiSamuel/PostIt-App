import { FETCH_MEMBERS } from '../actions/actionTypes';

const fetchMembersReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MEMBERS:
      return [...action.payload.allUser];
    default:
      return state;
  }
};

export default fetchMembersReducer;
