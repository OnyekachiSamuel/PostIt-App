import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../actions/actionTypes';

const initialState = {};
const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return Object.assign({}, state, action.payload);
    case ADD_USER_FAILURE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default addUserReducer;
