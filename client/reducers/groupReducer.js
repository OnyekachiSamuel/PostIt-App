import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_USER_GROUPS } from '../actions/actionTypes';

const initialState = [];
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_CREATION_SUCCESS:
      return [...state, action.userData];
    case FETCH_USER_GROUPS:
      return [...action.payload.groups];
    default:
      return state;
  }
};

export default groupReducer;
