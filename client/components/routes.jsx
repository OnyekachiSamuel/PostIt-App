import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/HomePage.jsx';
import CreateGroup from '../components/CreateGroup.jsx';
import PostMessage from '../components/PostMessage.jsx';
import ViewMessages from '../components/ViewMessages.jsx';

const Routes = () =>
  (
      <Switch>
        <Route exact path="/" component={HomePage} >
        <Route path="/api/group" component={CreateGroup} ></Route>
        <Route path="/api/group/:groupId/messages" component={PostMessage}></Route>
        <Route path="/api/group/view" component={ViewMessages}></Route>
        </Route>
      </Switch>
  );
// export default Routes;

