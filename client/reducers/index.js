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
import notificationReducer from '../reducers/notificationReducer';
import groupId from '../reducers/updateGroupId';
import groupInfo from '../reducers/updateGroupInfo';
import userIds from '../reducers/getUsersId';


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
  notificationReducer,
  groupId,
  groupInfo,
  userIds
});

export default rootReducer;
