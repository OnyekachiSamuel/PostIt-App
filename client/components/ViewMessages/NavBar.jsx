import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper"> <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="#"><i className="material-icons prefix">account_circle</i></Link></li>
            <li><Link to="#">Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
