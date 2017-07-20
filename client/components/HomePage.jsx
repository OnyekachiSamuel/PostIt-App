import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavLink from './Index/NavLink.jsx';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';
import { userSignupRequest } from './actions/signupAction';

class Home extends React.Component {
  render() {
    const signupRequest = this.props.userSignupRequest;
    return (
      <Router>
        <header>
          <nav>
            <div className="nav-wrapper" >
              <Link to="#">POST IT</Link>
              <NavLink/>
            </div>
          </nav>
          <Title/>
          <SignUpModal signupRequest={ signupRequest }/>
          <SignInModal/>
        </header>
      </Router>
    );
  }
}

Home.propTypes = {
  userSignupRequest: PropTypes.func
};

export default connect((state) => { return {}; }, { userSignupRequest })(Home);
