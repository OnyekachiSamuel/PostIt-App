import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutRequest } from '../actions/signOutAction';
import { resetCount } from '../actions/addUserAction';

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
      visible: false,
      count: this.props.notificationReducer.length
    };
    this.onClick = this.onClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * @return {null} Triggers the signOutRequest action to clear user data from the localStorage
   */
  onClick() {
    this.props.signOutRequest(this.state);
    this.props.signOut();
  }
  /**
   * @return {null} Updates the state on click of the notification icon
   */
  handleClick() {
    if (this.state.visible === false) {
      this.setState({ visible: true, count: 0 });
    } else {
      this.setState({ visible: false });
    }
    this.props.resetCount();
  }
  /**
   * @return {String} HTML markup for view component of NavLink
   */
  render() {
    const { notificationReducer } = this.props;
    const alertUser = notificationReducer;
    const { signin } = this.props;
    const { user } = signin;
    const alertUserComponent = alertUser.map((alert, index) => {
      return (
        <div key={index}> <span> {alert.username} posted in #{alert.groupId} on
          {new Date(alert.createdAt).toLocaleString()}
        </span>
        </div>
      );
    });
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.redirectUrl}><i className="left middle large material-icons">
            navigate_before</i></Link>
          <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li>{user.username}</li>
            <li><i className="large material-icons">notifications</i></li>
            {true && <li><Link to="#"><span className="new badge count"
              onClick={this.handleClick}>{this.props.notificationReducer.length}</span></Link></li>
            }
            <li>
              <Link to="#" style={{ fontSize: '15px' }} onClick={this.onClick}>Sign Out</Link>
            </li>
          </ul>
        </div>
        {this.state.visible &&
          <div className="right notification">
            {alertUserComponent}
          </div>
        }
      </nav>
    );
  }
}

NavBar.propTypes = {
  signOutRequest: PropTypes.func,
  resetCount: PropTypes.func
};

const mapStateToProps = (state) => {
  const { notificationReducer } = state;
  const { signin } = state;
  return {
    notificationReducer,
    signin
  };
};

export default connect(mapStateToProps, { signOutRequest, resetCount })(NavBar);
