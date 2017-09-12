import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class
 */
const NavLink = () => {
  return (
    <ul id="nav-mobile" className="right">
      <li><Link className="waves-effect waves-light btn sign-btn" to="#" data-target="modal1">
        Sign Up</Link></li>
      <li><Link className="waves-effect waves-light btn sign-btn" to="#" data-target="modal2">
        Sign In</Link></li>
    </ul>
  );
};

export default NavLink;
