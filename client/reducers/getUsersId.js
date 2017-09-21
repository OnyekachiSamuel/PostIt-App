import { FETCH_USERS_ID } from '../actions/actionTypes';

const initialState = [];
const getUsersId = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_ID:
      return [...action.payload];
    default:
      return state;
  }
};

export default getUsersId;
