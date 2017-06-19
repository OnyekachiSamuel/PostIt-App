import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

// Home page route

router.get('/', (req, res) => {
  res.send('Hello, welcome');
});

// Route for user signup
router.post('/signup', controller.signup);

// Route to create group by users
router.post('/group', controller.createGroup);

// Route to add users to group
router.post('/group/:id/user', controller.groups);

// Route to post messages to groups
router.post('/group/:groupId/messages', controller.messages);


export default router;
