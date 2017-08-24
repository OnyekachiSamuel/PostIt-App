import express from 'express';
import controller from '../controllers/controller';
import Validate from '../middlewares/validator';
import Verify from '../middlewares/ensureToken';
import { forgotPassword, resetPassword } from '../controllers/forgotPassword';

const router = express.Router();

// Route for user signup
router.post('/signup', Validate.signupInputs, controller.signup);

// Route for signin
router.post('/signin', Validate.signinInputs, controller.signin);

// Route to post group create info
router.post('/group', Validate.createGroupInputs, Verify.token, controller.createGroup);

// Route to add users to group
router.post('/group/:groupId/user', Validate.groupsInputs, Verify.token, controller.addUser);


// Route to post messages to groups
router.post('/group/:groupId/messages', Validate.messagesInputs, Verify.token, controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', Verify.token, controller.getMessages);

// Route to fetch all users in a group
router.get('/group/:groupId', Verify.token, controller.getUsersInGroup);

// Route to fetch all users
router.get('/users', Verify.token, controller.getAllUsers);

// Route to get all groups created by a user
router.get('/groups/:username', Verify.token, controller.getUserGroups);

// Route to add users to a group
// router.post('/post/users', Verify.token, controller.addUsers);

// Route to get all posts by a particular user
router.get('/posts/:groupId/:userId', Verify.token, controller.getUserMessages);

// Route to get all posts in a particular group
router.get('/post/messages/:groupId', Verify.token, controller.getMessages);

// router.get('/find', controller.find);
router.post('/forgot', forgotPassword);

// Reset password route
router.put('/reset/:token/:email', resetPassword);

// Route to get groups a users has been added to or belongs to
router.get('/groups/user/:userId', Verify.token, controller.usersGroup);
export default router;
