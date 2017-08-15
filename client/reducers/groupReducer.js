import { GROUP_CREATION_SUCCESS, GROUP_CREATION_FAILURE, FETCH_GROUP_SUCCESS } from '../actions/actionTypes';

const initialState = [];
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_CREATION_SUCCESS:
      return [...state, action.userData];
    case FETCH_GROUP_SUCCESS:
      return [...action.payload.data.groups];
    case GROUP_CREATION_FAILURE:
      return Object.assign({}, {}, action.errors);
    default:
      return state;
  }
};

export default groupReducer;
