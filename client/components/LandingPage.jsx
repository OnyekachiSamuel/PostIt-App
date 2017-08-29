import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from './Index/NavLink.jsx';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';
import { userSignUpRequest } from '../actions/signUpAction';
import { userSignInRequest } from '../actions/signInAction';

/**
 * @class HomePage
 */
export class LandingPage extends React.Component {
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
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
      <div>
        <header>
          <nav>
            <div className="nav-wrapper" >
              <Link to="#">POST IT</Link>
              <NavLink/>
            </div>
          </nav>
          <Title/>
          <SignUpModal
            loginSuccess={this.loginSuccess.bind(this)}
           signUpRequest={ signUpRequest } />
          <SignInModal signInRequest = { signInRequest }
          loginSuccess={this.loginSuccess.bind(this)} />
        </header>
      </div>
    );
  }
}

LandingPage.propTypes = {
  userSignUpRequest: PropTypes.func,
  userSignInRequest: PropTypes.func
};

export default connect(null, { userSignUpRequest, userSignInRequest })(LandingPage);

