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


const rootReducer = combineReducers({ signup,
  signin,
  groups,
  users,
  post,
  addUser,
  fetchMembers,
  groupPost,
  forgetPassword
});

export default rootReducer;
