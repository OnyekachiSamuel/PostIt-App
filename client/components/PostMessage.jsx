import React from 'react';
import { withRouter } from 'react-router';
import NavBar from '../components/NavBar.jsx';
import WhiteBar from '../components/WhiteBar.jsx';
import ComposeMessage from './PostMessage/ComposeMessage.jsx';
import PostedMessage from './PostMessage/PostedMessage.jsx';
import ViewMembers from './PostMessage/ViewMembersModal.jsx';
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
        <NavBar signOut={this.signOut.bind(this)} redirectUrl={'/group'} />
        <WhiteBar />
        <ViewMembers />
        <ComposeMessage />
        <PostedMessage />
      </div>
    );
  }
}

export default withRouter(BroadcastMessage);
