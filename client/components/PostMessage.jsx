import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './PostMessage/NavBar.jsx';
import Title from './PostMessage/Title.jsx';
import PostForm from './PostMessage/PostForm.jsx';
import PostedMessage from './PostMessage/PostedMessage.jsx';
import ViewMembers from './PostMessage/ViewModal.jsx';
import Footer from './Footer.jsx';

class BroadcastMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal();
  }

  signOut() {
    this.props.history.push('/');
  }
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
