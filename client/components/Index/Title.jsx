import React from 'react';
import { Link } from 'react-router-dom';

export default class Title extends React.Component {
  render() {
    return (
      <div className="page-heading">
        <h1><b>We have got you connected</b></h1>
        <h2>post it today and share your thoughts in your groups.</h2>
        <Link className="waves-effect waves-light signup-btn" to="#modal1">Sign Up Now</Link>
      </div>
    );
  }
}
