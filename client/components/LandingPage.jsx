import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';
import { userSignUpRequest } from '../actions/signUpAction';
import { userSignInRequest } from '../actions/signInAction';

/**
 * @class HomePage
 */
class LandingPage extends React.Component {
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
  }
  /**
   * @return {null} navigates to the group creation page
   */
  loginSuccess() {
    this.props.history.push('/group');
    window.location.reload();
  }
  /**
   * @return {String} HTML markup for view component of HomePage
   */
  render() {
    const signUpRequest = this.props.userSignUpRequest;
    const signInRequest = this.props.userSignInRequest;
    return (
      <div className="container-fluid my-background">
        <div className="row">
          <nav>
            <div className="nav-wrapper">
              <Link to="#">POST IT</Link>
              <a href="#" data-activates="mobile-demo"
              className="button-collapse">
                <i className="material-icons">menu</i></a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link className="waves-effect waves-light btn sign-btn"
                to="#" data-target="modal1">
                  Sign Up</Link></li>
                <li><Link className="waves-effect waves-light btn sign-btn"
                 to="#" data-target="modal2">
                  Sign In</Link></li>
              </ul>
              <ul className="side-nav" id="mobile-demo">
                <li><Link className="waves-effect waves-light btn sign-btn"
                 to="#" data-target="modal1">
                  Sign Up</Link></li>
                <li><Link className="waves-effect waves-light btn sign-btn"
                 to="#" data-target="modal2">
                  Sign In</Link></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row">
          <Title />
        </div>
        <SignUpModal
          loginSuccess={this.loginSuccess.bind(this)}
          signUpRequest={signUpRequest} />
        <SignInModal signInRequest={signInRequest}
          loginSuccess={this.loginSuccess.bind(this)} />
      </div>
    );
  }
}

LandingPage.propTypes = {
  userSignUpRequest: PropTypes.func,
  userSignInRequest: PropTypes.func
};

export default connect(null,
{ userSignUpRequest, userSignInRequest })(LandingPage);

