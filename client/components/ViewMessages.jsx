import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './ViewMessages/NavBar.jsx';
import Title from './ViewMessages/Title.jsx';
import Messages from './ViewMessages/Messages.jsx';
import SelectGroup from './ViewMessages/SelectGroup.jsx';
import Footer from './Footer.jsx';

class ViewMessages extends React.Component {
  signOut() {
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <NavBar signOut={this.signOut.bind(this)}/>
          <Title/>
          <SelectGroup />
          {/*<div className="container">
          <Messages/>
          </div>*/}
          <Footer/>
      </div>
    );
  }
}

export default withRouter(ViewMessages);
