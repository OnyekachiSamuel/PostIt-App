import { combineReducers } from 'redux';
import signup from './signupReducer';
import signin from './signinReducer';
import groups from './groupReducer';
import users from './fetchUsersReducer';
import post from './postReducer';
import addUser from './addUserReducer';
import fetchMembers from './fetchGroupMembers';
import groupPost from './groupPostReducer';


const rootReducer = combineReducers({ signup,
  signin,
  groups,
  users,
  post,
  addUser,
  fetchMembers,
  groupPost
});

export default rootReducer;
