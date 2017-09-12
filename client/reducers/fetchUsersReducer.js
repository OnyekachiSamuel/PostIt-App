import { FETCH_USERS_SUCCESS } from '../actions/actionTypes';

const initialState = {};
const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {...action.payload.data};
    default:
      return state;
  }
};

export default fetchUsersReducer;
