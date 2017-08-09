import { FETCH_USERS_SUCCESS } from '../actions/actionTypes';

const initialState = [];
const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return [...state, ...action.payload.data.users];
    default:
      return state;
  }
};

export default fetchUsersReducer;
