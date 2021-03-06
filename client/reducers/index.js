import { combineReducers } from 'redux';
import signup from './signUpReducer';
import signin from './signInReducer';
import groups from './groupReducer';
import searchResult from './fetchUsersReducer';
import post from './postReducer';
import addUser from './addUserReducer';
import fetchMembers from './fetchGroupMembers';
import groupPost from './groupPostReducer';
import forgetPassword from './forgetPasswordReducer';
import groupId from '../reducers/updateGroupId';
import groupInfo from '../reducers/updateGroupInfo';
import groupMembers from '../reducers/getGroupMembers';


const rootReducer = combineReducers({
  signup,
  signin,
  groups,
  searchResult,
  post,
  addUser,
  fetchMembers,
  groupPost,
  forgetPassword,
  groupId,
  groupInfo,
  groupMembers
});

export default rootReducer;
