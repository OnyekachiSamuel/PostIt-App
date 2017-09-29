import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutRequest } from '../actions/signOutAction';

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
      isLoggedOut: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @return {null} Triggers the signOutRequest action to clear user data from the localStorage
   */
  onClick() {
    this.props.signOutRequest(this.state);
    this.props.signOut();
  }
  /**
   * @return {String} HTML markup for view component of NavLink
   */
  render() {
    const { signin } = this.props;
    const { user } = signin;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.redirectUrl}><i className="left middle large material-icons">
            navigate_before</i></Link>
          <Link to="/">POST IT</Link>
          <ul id="nav-mobile" className="right">
           <li>{`hi, ${user.username}`}</li>
          <li>
            <Link className="waves-effect waves-light btn sign-btn" to="#" style={{ fontSize: '15px' }} onClick={this.onClick}>Sign Out</Link>
           </li>
          </ul>
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  signOutRequest: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { signin } = state;
  return {
    signin

  };
};

export default connect(mapStateToProps, { signOutRequest })(NavBar);
