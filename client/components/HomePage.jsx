import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from './Index/NavLink.jsx';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';
import { userSignupRequest } from '../actions/signupAction';
import { userSigninRequest } from '../actions/signinAction';

class Home extends React.Component {
  componentDidMount() {
    $('.modal').modal();
    $('.collapsible').collapsible();
  }
  loginSuccess() {
    this.props.history.push('/group');
    window.location.reload();
  }
  render() {
    const signupRequest = this.props.userSignupRequest;
    const signinRequest = this.props.userSigninRequest;
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
           signupRequest={ signupRequest } />
          <SignInModal signinRequest = { signinRequest }
          loginSuccess={this.loginSuccess.bind(this)} />
        </header>
      </div>
    );
  }
}

Home.propTypes = {
  userSignupRequest: PropTypes.func,
  userSigninpRequest: PropTypes.func
};

export default connect(null, { userSignupRequest, userSigninRequest })(Home);

