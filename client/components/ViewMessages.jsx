import React from 'react';
import { withRouter } from 'react-router';
import NavBar from './ViewMessages/NavBar.jsx';
import Title from './ViewMessages/Title.jsx';
import SelectGroup from './ViewMessages/SelectGroup.jsx';
import Footer from './Footer.jsx';

/**
 * @class ViewMessages
 */
class ViewMessages extends React.Component {
/**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  /**
   * @return {null} navigates to the landing page
   */
  signOut() {
    this.props.history.push('/');
  }
  /**
   * @return {String} HTML markup for view component of ViewMessages
   */
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
