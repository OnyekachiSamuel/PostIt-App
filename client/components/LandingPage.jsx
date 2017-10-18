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
   * This constructor handles method binding
   * @param {obj} props
   * @return {null} This method returns nothing
   */
  constructor(props) {
    super(props);
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  /**
   * Makes the jQuery function available on component mount
   * @return {null} This method returns nothing
   */
  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
    $('.button-collapse').sideNav();
  }

  /**
   * Handles navigation to the group creation page
   * @return {null} This method returns nothing
   */
  loginSuccess() {
    this.props.history.push('/group');
    window.location.reload();
  }

  /**
   * Renders HTML markup for view component of HomePage
   * @return {String} Returns html markup for HomePage
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
          loginSuccess={this.loginSuccess}
          signUpRequest={signUpRequest} />
        <SignInModal signInRequest={signInRequest}
          loginSuccess={this.loginSuccess} />
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

