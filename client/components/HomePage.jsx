import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from './Index/NavLink.jsx';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';
import { userSignupRequest } from '../actions/signupAction';
// import { addFlashMessage } from '../actions/flashMessage';

class Home extends React.Component {
  loginSuccess() {
    this.props.history.push('/group');
  }
  render() {
    const signupRequest = this.props.userSignupRequest;
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
          <SignInModal/>
        </header>
      </div>
    );
  }
}

Home.propTypes = {
  userSignupRequest: PropTypes.func
};

export default connect(null, { userSignupRequest })(Home);
