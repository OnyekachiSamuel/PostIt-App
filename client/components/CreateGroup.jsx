import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar.jsx';
import WhiteBar from '../components/WhiteBar.jsx';
import GroupModal from './CreateGroup/GroupModal.jsx';
import GroupList from './CreateGroup/GroupList.jsx';
import AddUser from './CreateGroup/AddUser.jsx';
import Footer from './Footer.jsx';
import { fetchUserGroupRequest } from '../actions/fetchUserGroups';
import { testAction } from '../actions/addUserAction';

/**
 * @class CreateGroup
 */
class CreateGroup extends React.Component {
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    const token = localStorage.getItem('token');
    this.props.testAction({ token });
    const { signin } = this.props;
    this.props.fetchUserGroupRequest(signin.user.userId);
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
        <NavBar signOut={ this.signOut.bind(this)} redirectUrl = {'/'}/>
        <WhiteBar/>
        <div>
          <GroupList />
          <AddUser />
         </div>
        <GroupModal/>
      </div>
    );
  }
}

CreateGroup.propTypes = {
  signInRequest: PropTypes.func,
  forgetPasswordRequest: PropTypes.func,
  testAction: PropTypes.func
};
const mapStateToProps = (state) => {
  const { signin } = state;
  return {
    signin
  };
};

export default connect(mapStateToProps, { fetchUserGroupRequest, testAction })(withRouter(CreateGroup));

