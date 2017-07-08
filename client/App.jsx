import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import CreateGroup from './components/CreateGroup.jsx';
import PostMessage from './components/PostMessage.jsx';
import ViewMessages from './components/ViewMessages.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={CreateGroup} ></Route>
        <Route path="/api/group" component={HomePage} ></Route>
        <Route exact path="/api/group/post" component={PostMessage}></Route>
        <Route exact path="/api/group/view" component={ViewMessages}></Route>
      </Switch>
    );
  }
}
