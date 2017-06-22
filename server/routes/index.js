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

// Route to create group by users
router.post('/group', controller.createGroup);

// Route to add users to group
router.post('/group/:id/user', controller.groups);

// Route to post messages to groups
router.post('/group/:groupId/messages', controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', controller.getMessages);

export default router;