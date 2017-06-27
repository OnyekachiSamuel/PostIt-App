import React from 'react';
import NavBar from './ViewMessages/NavBar.jsx';
import Title from './ViewMessages/Title.jsx';
import Messages from './ViewMessages/Messages.jsx';
import Footer from './Footer.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Title/>
          <Messages/>
          <Footer/>
        </div>
      </div>
    );
  }
}
