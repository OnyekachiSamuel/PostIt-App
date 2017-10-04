import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import CreateGroup from './CreateGroup.jsx';
import PostMessage from './PostMessage.jsx';
import ViewMessages from './ViewMessages.jsx';
import requireAuth from '../utils/requireAuth';
import requireAuthLogin from '../utils/requireAuthLogin';
import ForgetPasswordPage from '../components//ForgetPasswordPage.jsx';
import NotFound from '../components/NotFoundPage.jsx';
import Footer from '../components/Footer.jsx';

/**
 * @return {string} HTML markup for view component of Title
 * @function App
 */
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/forgetPassword/:token"
          component={ForgetPasswordPage} />
          <Route exact path="/" component={requireAuthLogin(LandingPage)} />
          <Route exact path="/group" component={requireAuth(CreateGroup)} />
          <Route exact path="/messages" component={requireAuth(ViewMessages)} />
          <Route exact path="/:groupId/:groupName/post"
          component={requireAuth(PostMessage)} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
export default App;
