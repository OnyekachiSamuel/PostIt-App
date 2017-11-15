import { UPDATE_GROUP_ID } from '../actions/actionTypes';

/**
 * This reducers updates the state with groupId
 * @param {obj} state
 * @param {obj} action
 * @return {obj} Here the state is reduced based on the action object and
 *  a new start returned
 */
const updateGroupIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP_ID:
      return { ...action.payload };
    default:
      return state;
  }
};
export default updateGroupIdReducer;
