import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { signoutRequest } from '../../actions/signoutAction';

/**
 * @class NavBar
 */
class NavBar extends React.Component {
  /**
   * @return {null} Initializes the state and binds methods
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
    this.props.signoutRequest(this.state);
    this.props.signOut();
  }
  /**
   * @return {String} HTML markup for view component of NavBar
   */
  render() {
    return (
      <nav>
        <div className="nav-wrapper"> <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="#"><i className="material-icons">message</i></Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="#" onClick={this.onClick}>Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  signoutRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
};

export default connect(null, { signoutRequest })(withRouter(NavBar));
