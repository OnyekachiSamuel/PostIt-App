import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import NavLink from './Index/NavLink.jsx';
import SignUpModal from './Index/SignUpModal.jsx';
import SignInModal from './Index/SignInModal.jsx';
import Title from './Index/Title.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <Router>
        <header>
          <nav>
            <div className="nav-wrapper" >
              <Link to="#">POST IT, SHARE IT</Link>
              <NavLink/>
            </div>
          </nav>
          <Title/>
          <SignUpModal/>
          <SignInModal/>
        </header>
      </Router>
    );
  }
}
