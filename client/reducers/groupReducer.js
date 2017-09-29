import { GROUP_CREATION_SUCCESS, FETCH_USER_GROUPS } from '../actions/actionTypes';

const initialState = [];
const groupReducer = (state = initialState, action) => {
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
