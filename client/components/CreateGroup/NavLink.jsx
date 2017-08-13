import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutRequest } from '../../actions/signoutAction';

/**
 * @class NavBar
 */
class NavBar extends React.Component {
  /**
   * @return {null} Initializes the state and binds the onClick method
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @return {null} Triggers the signOutRequest action to clear user data from the localStorage
   */
  onClick() {
    this.props.signoutRequest(this.state);
    this.props.signOut();
  }
  /**
   * @return {String} HTML markup for view component of NavLink
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="#" onClick={this.onClick}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signoutRequest })(NavBar);
