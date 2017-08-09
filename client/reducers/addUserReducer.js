import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../actions/actionTypes';

const initialState = [];
const addUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return [...state, action.payload];
    case ADD_USER_FAILURE:
      return [...state, action.userData];
    default:
      return state;
  }
};

export default addUserReducer;
