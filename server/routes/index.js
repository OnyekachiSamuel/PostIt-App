import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

// Home page route

router.get('/', (req, res) => {
  res.send('Hello, welcome');
});

// Route for user signup
router.post('/signup', controller.signup);

// Route for signin
router.post('/signin', controller.signin);

// Middleware to create session for users once they are logged in
router.use(controller.sessionHandler);

// Route to get group creation page
router.get('/group', controller.loggedIn, (req, res) => {
  res.json({ status: 'You can then create a group' });
});

// Route to post group create info
router.post('/group', controller.loggedIn, controller.createGroup);

// Route to add users to group
router.post('/group/:id/user', controller.loggedIn, controller.groups);

// Route to post messages to groups
router.post('/group/:groupId/messages', controller.loggedIn, controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', controller.loggedIn, controller.getMessages);

// Route for logout
router.get('/logout', (req, res) => {
  req.session.reset();
  res.redirect('/');
});

export default router;
