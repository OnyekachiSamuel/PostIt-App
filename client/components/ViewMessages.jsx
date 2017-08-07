import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './ViewMessages/NavBar.jsx';
import Title from './ViewMessages/Title.jsx';
import SelectGroup from './ViewMessages/SelectGroup.jsx';
import Footer from './Footer.jsx';

class ViewMessages extends React.Component {

  componentDidMount() {
    $('.collapsible').collapsible();
  }
  signOut() {
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        <NavBar signOut={this.signOut.bind(this)}/>
          <Title/>
          <SelectGroup />
          <Footer/>
      </div>
    );
  }
}

export default withRouter(ViewMessages);
