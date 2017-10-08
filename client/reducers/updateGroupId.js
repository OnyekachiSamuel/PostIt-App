import { UPDATE_GROUP_ID } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {obj} This reducers updates the state with groupId
 *
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
