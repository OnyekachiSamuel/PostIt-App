import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './PostMessage/NavBar.jsx';
import Title from './PostMessage/Title.jsx';
import PostForm from './PostMessage/PostForm.jsx';
import PostedMessage from './PostMessage/PostedMessage.jsx';
import ViewMembers from './PostMessage/ViewModal.jsx';
import Footer from './Footer.jsx';

/**
 * @class BroadcastMessage
 */
class BroadcastMessage extends React.Component {
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal();
  }
/**
   * @return {null} navigates to the landing page
   */
  signOut() {
    this.props.history.push('/');
  }
  /**
   * @return {String} HTML markup for view component of PostMessage
   */
  render() {
    return (
      <div>
        <NavBar signOut={this.signOut.bind(this)}/>
          <Title/>
          <ViewMembers/>
          <PostForm/>
          <div className="container">
          <PostedMessage/>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default withRouter(BroadcastMessage);
