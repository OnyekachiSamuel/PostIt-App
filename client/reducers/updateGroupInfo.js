import { UPDATE_GROUP_INFO } from '../actions/actionTypes';

const updateGroupInfo = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GROUP_INFO:
      return { ...action.payload };
    default:
      return state;
  }
};
export default updateGroupInfo;
