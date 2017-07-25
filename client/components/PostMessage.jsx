import React from 'react';
import NavBar from './PostMessage/NavBar.jsx';
import Title from './PostMessage/Title.jsx';
import PostForm from './PostMessage/PostForm.jsx';
import PostedMessage from './PostMessage/PostedMessage.jsx';
import Footer from './Footer.jsx';

export default class BroadcastMessage extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Title/>
          <PostForm/>
          <PostedMessage/>
          <Footer/>
        </div>
      </div>
    );
  }
}
