import { UPDATE_GROUP_INFO } from '../actions/actionTypes';

/**
 * This reducer updates the state with group names
 * of groups a user belongs to
 * @param {obj} state
 * @param {obj} action
 * @return {obj} Here the state is reduced based on the action object and
 *  a new start returned
 */
const updateGroupInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};
export default updateGroupInfo;
