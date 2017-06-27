import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import style from './styles/main.css';
import HomePage from './components/HomePage.jsx';
// import CreateGroup from './components/CreateGroup.jsx';
// import PostMessage from './components/PostMessage.jsx';
// import ViewMessages from './components/ViewMessages.jsx';
import js from './js/main';


class Home extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={HomePage}>
        </Route>
      </Router>
    );
  }
}
ReactDOM.render(<Home/>, document.getElementById('app'));
