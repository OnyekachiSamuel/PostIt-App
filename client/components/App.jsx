import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import CreateGroup from './CreateGroup.jsx';
import PostMessage from './PostMessage.jsx';
import ViewMessages from './ViewMessages.jsx';
import requireAuth from '../utils/requireAuth';
import ForgetPasswordPage from '../components//ForgetPasswordPage.jsx';

/**
 * @class
 */
export default class App extends React.Component {
  /**
   * @return {String} HTML markup
   */
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/forgetPassword/:token/:email" component={ForgetPasswordPage} />
        <Route exact path="/" component={LandingPage} />
        <Route path="/group" component={requireAuth(CreateGroup)} />
        <Route path="/messages" component={requireAuth(ViewMessages)} />
        <Route path="/:groupId" component={requireAuth(PostMessage)} />
      </Switch>
      </BrowserRouter>
    );
  }
}
