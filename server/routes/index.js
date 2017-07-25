import express from 'express';
import controller from '../controllers/controller';
import Validate from '../middlewares/validator';
import Verify from '../middlewares/ensureToken';

const router = express.Router();

// Route for user signup
router.post('/signup', Validate.signupInputs, controller.signup);

// Route for signin
router.post('/signin', Validate.signinInputs, controller.signin);

// Middleware to protect routes
router.use(Verify.token);

// Route to post group create info
router.post('/group', Validate.createGroupInputs, controller.createGroup);

// Route to add users to group
router.post('/group/:groupId/user', Validate.groupsInputs, controller.addUser);

// Route to post messages to groups
router.post('/group/:groupId/messages', Validate.messagesInputs, controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', controller.getMessages);

// Route to fetch all users in a group
router.get('/group/:groupId/all', controller.getUsersInGroup);

// Route to fetch all users
router.get('/all/users', controller.getAllUsers);

export default router;
