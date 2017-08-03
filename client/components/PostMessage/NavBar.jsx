import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutRequest } from '../../actions/signoutAction';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.signoutRequest(this.state);
    this.props.signOut();
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper"> <Link to="#">POST IT</Link>
          <ul id="nav-mobile" className="right">
            <li><Link to="#"><i className="material-icons">message</i></Link></li>
            <li><Link to="#">Messages</Link></li>
            <li><Link to="#"><i className="material-icons prefix">account_circle</i></Link></li>
            <li><Link to="#" onClick={this.onClick}>Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(null, { signoutRequest })(NavBar);
