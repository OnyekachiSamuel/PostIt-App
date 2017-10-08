import { UPDATE_GROUP_INFO } from '../actions/actionTypes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @return {obj} This reducer updates the state with group names
 * of groups a user belongs to
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
