import express from 'express';
import Validate from '../middlewares/validator';
import Verify from '../middlewares/ensureToken';
import { forgotPassword, resetPassword } from '../controllers/forgotPassword';
import messageController from '../controllers/messageController';
import userController from '../controllers/userController';
import groupController from '../controllers/groupController';

const router = express.Router();

// Route for user signup
router.post('/signup', Validate.signupInputs, userController.signup);

// Route for signin
router.post('/signin', Validate.signinInputs, userController.signin);

// Route to post group create info
router.post('/group', Validate.createGroupInputs, Verify.token, groupController.createGroup);

// Route to add users to group
router.post('/group/:groupId/user', Validate.groupsInputs, Verify.token, userController.addUser);

// Route to post messages to groups
router.post('/group/:groupId/messages', Validate.messagesInputs, Verify.token, messageController.postMessage);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', Validate.validateGroupId, Verify.token, messageController.getMessages);

// Route to fetch all users in a group
router.get('/group/:groupId', Validate.validateGroupId, Verify.token, userController.getUsersInGroup);

// Route to fetch all users
router.get('/users', Verify.token, userController.searchUsers);

// Route to get all groups created by a user
router.get('/groups/:username', Verify.token, groupController.getUserGroups);

// Route to get all posts by a particular user
router.get('/posts/:groupId/:userId', Validate.groupIdAndUserId, Verify.token, messageController.getUserMessages);

// Route to get all posts in a particular group
router.get('/post/messages/:groupId', Verify.token, messageController.getMessages);

// forget password route
router.post('/forgot', forgotPassword);

// Reset password route
router.put('/reset/:token', resetPassword);

// Route to get groups a users has been added to or belongs to
router.get('/groups/user/:userId', Validate.validateUserId, Verify.token, groupController.usersGroup);

// Route for google signup and  login
router.post('/auth/google', userController.googleAuth);

// Route to get the Id's of all user in a particular group
router.post('/group/:groupId/userIds', Validate.validateGroupId, Verify.token, groupController.getAllUsersInGroup);
export default router;
