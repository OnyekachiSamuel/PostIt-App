import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default class NavLink extends React.Component {
  render() {
    return (
      <ul id="nav-mobile" className="right">
        <li><Link className="waves-effect waves-light" to="#modal1">Sign Up</Link></li>
        <li><Link className="waves-effect waves-light" to="#modal2">Sign In</Link></li>
      </ul>
    );
  }
}

