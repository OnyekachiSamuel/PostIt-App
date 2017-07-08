import React from 'react';

export default class Title extends React.Component {
  render() {
    return (
      <div className="page-heading">
        <h1><b>We have got you connected</b></h1>
        <h2>post it today and share your thoughts in your groups.</h2>
        <a className="waves-effect waves-light signup-btn" href="#modal1">Sign Up Now</a> 
      </div>
    );
  }
}
