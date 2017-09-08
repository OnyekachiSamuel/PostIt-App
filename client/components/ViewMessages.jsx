import React from 'react';
import { withRouter } from 'react-router';
import NavBar from '../components//NavBar.jsx';
import WhiteBar from '../components/WhiteBar.jsx';
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
    $('.modal').modal();
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
        <NavBar signOut={this.signOut.bind(this)} redirectUrl={'/group'} />
        <WhiteBar />
        <SelectGroup />
      </div>
    );
  }
}

export default withRouter(ViewMessages);
