import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOutRequest } from '../actions/signOutAction';

/**
 * @class NavBar
 */
export class NavBar extends React.Component {
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
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.button-collapse').sideNav({
      closeOnClick: true
    }
    );
  }
  /**
   * @return {null} Triggers the signOutRequest action to clear user data
   *  from the localStorage
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
          {
            this.props.show() &&
            <Link to={this.props.redirectUrl}>
              <i className="left middle large material-icons">
                navigate_before</i></Link>
          }
          <Link to={this.props.redirectUrl}>POST IT</Link>
          <a href="#!" data-activates="mobile-demo-two"
            className="button-collapse">
            <i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{`hi, ${user.username}`}</li>
            <li>
              <Link className="waves-effect waves-light btn sign-btn" to="#"
                id="sign-btn"
                onClick={this.onClick}>Sign Out</Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-demo-two">
            <li className="green-text center">{`hi, ${user.username}`}</li>
            <li>
              <Link className="waves-effect waves-light btn sign-btn" to="#"
                onClick={this.onClick}>Sign Out</Link>
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

export const mapStateToProps = (state) => {
  const { signin } = state;
  return {
    signin

  };
};

export default connect(mapStateToProps, { signOutRequest })(NavBar);
