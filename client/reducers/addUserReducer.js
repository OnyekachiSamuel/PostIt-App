import { ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../actions/actionTypes';

/**
 * This reducer handles adding a user to a group.
 * @param {obj} state
 * @param {obj} action
 * @return {obj} Here the state is reduced based on the action object and
 * a new start returned
 */
const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER_SUCCESS:
      return { ...action.payload };
    case ADD_USER_FAILURE:
      return { ...action.payload };
    default:
      return state;
  }
};

export default addUserReducer;
