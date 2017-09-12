import { combineReducers } from 'redux';
import signup from './signUpReducer';
import signin from './signInReducer';
import groups from './groupReducer';
import users from './fetchUsersReducer';
import post from './postReducer';
import addUser from './addUserReducer';
import fetchMembers from './fetchGroupMembers';
import groupPost from './groupPostReducer';
import forgetPassword from './forgetPasswordReducer';
import notificationReducer from '../reducers/notificationReducer';
import groupId from '../reducers/updateGroupId';


const rootReducer = combineReducers({ signup,
  signin,
  groups,
  users,
  post,
  addUser,
  fetchMembers,
  groupPost,
  forgetPassword,
  notificationReducer,
  groupId
});

export default rootReducer;
