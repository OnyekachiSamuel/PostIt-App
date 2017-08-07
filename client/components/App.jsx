import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import CreateGroup from './CreateGroup.jsx';
import PostMessage from './PostMessage.jsx';
import ViewMessages from './ViewMessages.jsx';
import requireAuth from '../utils/requireAuth';

/**
 * @class
 */
export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/group" component={requireAuth(CreateGroup)} />
        <Route path="/messages" component={ViewMessages} />
        <Route path="/:groupId" component={PostMessage} />
      </Switch>
      </BrowserRouter>
    );
  }
}
