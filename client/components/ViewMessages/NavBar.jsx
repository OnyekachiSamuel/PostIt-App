import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutRequest } from '../../actions/signOutAction';

/**
 * @class NavBar
 */
export class NavBar extends React.Component {
  /**
   * @return {null} Initializes the state and method binding
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @return {null} Triggers the signoutRequest action on click of signout button
   */
  onClick() {
    this.props.signOutRequest(this.state);
    this.props.signOut();
  }
  /**
   * @return {String} HTML markup for view component NavBar
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper"> <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="#" onClick={this.onClick}>Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signOutRequest })(NavBar);
