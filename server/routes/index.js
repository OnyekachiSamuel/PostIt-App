import express from 'express';
import controller from '../controllers/controller';

const router = express.Router();

// Home page route


// Route for user signup
router.post('/signup', controller.signup);

// Route for signin
router.post('/signin', controller.signin);

// router.use(controller.sessionHandler);

// Route to post group create info
router.post('/group', controller.createGroup);

// Route to add users to group
router.post('/group/:id/user', controller.groups);

// Route to post messages to groups
router.post('/group/:groupId/messages', controller.messages);

// Route to get messages posted to groups
router.get('/group/:groupId/messages', controller.getMessages);

// Route for logout
/* router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: 'Logged out' });
    }
  });
});*/

export default router;
