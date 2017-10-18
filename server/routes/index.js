import express from 'express';
import Validator from '../middlewares/Validator';
import EnsureToken from '../middlewares/EnsureToken';
import MessageController from '../controllers/MessageController';
import UserController from '../controllers/UserController';
import GroupController from '../controllers/GroupController';
import forgotPassword from '../controllers/forgotPassword';
import resetPassword from '../controllers/resetPassword';

const router = express.Router();

// Route for user signup
router.post('/signup', Validator.signUpInputs, UserController.signup);

// Route for signin
router.post('/signin', Validator.signInInputs, UserController.signin);

// Route to post group create info
router.post('/group', Validator.createGroupInputs, EnsureToken.token, GroupController.createGroup);

// Route to add users to group
router.post('/group/:groupId/user', Validator.groupsInputs, EnsureToken.token, UserController.addUser);

// Route to post messages to groups
router.post('/group/:groupId/messages', Validator.messagesInputs, EnsureToken.token, MessageController.postMessage);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', Validator.validateGroupId, EnsureToken.token, MessageController.getMessages);

// Route to fetch all users in a group
router.get('/group/:groupId', Validator.validateGroupId, EnsureToken.token, UserController.getUsersInGroup);

// Route to fetch all users
router.get('/users', EnsureToken.token, UserController.searchUsers);

// Route to get all groups created by a user
router.get('/groups/:username', EnsureToken.token, GroupController.getUserGroups);

// Route to get all posts by a particular user
router.get('/posts/:groupId/:userId', Validator.groupIdAndUserId, EnsureToken.token, MessageController.getUserMessages);

// Route to get all posts in a particular group
router.get('/post/messages/:groupId', Validator.validateGroupId, EnsureToken.token, MessageController.getMessages);

// forget password route
router.post('/forgot', forgotPassword);

// Reset password route
router.put('/reset/:token', resetPassword);

// Route to get groups a users has been added to or belongs to
router.get('/groups/user/:userId', Validator.validateUserId, EnsureToken.token, GroupController.usersGroup);

// Route for google signup and  login
router.post('/auth/google', UserController.googleAuth);

// Route to get the Id's of all user in a particular group
router.post('/group/:groupId/userIds', Validator.validateGroupId, EnsureToken.token, GroupController.getAllUsersInGroup);

// Route to get groups a user belongs to. It returns a paginated
// result of the groups
router.get('/groups/paginated/:userId', Validator.validateUserId, EnsureToken.token, GroupController.fetchUsersGroup);
export default router;
