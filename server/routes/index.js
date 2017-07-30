import express from 'express';
import controller from '../controllers/controller';
import Validate from '../middlewares/validator';
import Verify from '../middlewares/ensureToken';

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
router.get('/group/:groupId/all', Verify.token, controller.getUsersInGroup);

// Route to fetch all users
router.get('/users', Verify.token, controller.getAllUsers);

// Route to get all groups created by a user
router.get('/groups/:username', Verify.token, controller.getUserGroups);

router.post('/post/users', controller.addUsers);

export default router;
