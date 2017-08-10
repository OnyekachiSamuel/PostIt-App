import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class
 */
export class NavLink extends React.Component {
  render() {
    return (
      <ul id="nav-mobile" className="right">
        <li><Link className="waves-effect waves-light" to="#modal1">Sign Up</Link></li>
        <li><Link className="waves-effect waves-light" to="#modal2">Sign In</Link></li>
      </ul>
    );
  }
}

export default NavLink;
