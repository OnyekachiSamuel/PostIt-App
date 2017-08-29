import { UPDATE_GROUP_ID } from '../actions/actionTypes';

const updateGroupIdReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP_ID:
      return { ...action.payload };
    default:
      return state;
  }
};
export default updateGroupIdReducer;
