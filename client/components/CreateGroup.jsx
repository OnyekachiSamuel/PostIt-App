import React from 'react';
import { withRouter } from 'react-router';
import NavLink from './CreateGroup/NavLink.jsx';
import Title from './CreateGroup/TitleHeader.jsx';
import AddUser from './CreateGroup/AddUser.jsx';
import SelectGroup from './CreateGroup/SelectGroup.jsx';
import GroupModal from './CreateGroup/GroupModal.jsx';
import Footer from './Footer.jsx';

/**
 * @class CreateGroup
 */
class CreateGroup extends React.Component {
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      inDuration: 300,
      outDuration: 200,
      startingTop: '4%',
      endingTop: '10%',
      ready: function (modal, trigger) {
        console.log(modal, trigger);
      },
      complete: function () { }
    }
  );
    $('select').material_select();
  }
  /**
   * @return {null} navigates to the landing page
   */
  signOut() {
    this.props.history.push('/');
  }
  /**
   * @return {String} HTML markup for view component of CreateGroup
   */
  render() {
    return (
      <div>
        <NavLink signOut={ this.signOut.bind(this) }/>
        <Title/>
        <AddUser/>
        <GroupModal/>
        <SelectGroup/>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(CreateGroup);
