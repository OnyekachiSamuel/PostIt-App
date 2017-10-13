import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import WhiteBar from '../components/WhiteBar.jsx';
import GroupModal from './CreateGroup/GroupModal.jsx';
import GroupList from './CreateGroup/GroupList.jsx';
import AddUser from './CreateGroup/AddUser.jsx';
import { fetchUserGroupRequest } from '../actions/fetchUserGroups';
import { signOutRequest } from '../actions/signOutAction';
import NavBar from '../components/NavBar.jsx';

/**
 * @class CreateGroup
 */
class CreateGroup extends React.Component {
  /**
   * @return {null} Initializes the state and binds the onClick method
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
    };
    this.onClick = this.onClick.bind(this);
    this.signOut = this.signOut.bind(this);
    this.show = this.show.bind(this);
  }
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
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
      },
      complete: function () { }
    }
    );
    $('select').material_select();
    $('.button-collapse').sideNav({
      closeOnClick: true
    }
  );
  }
  /**
   * @return {null} Triggers the signOutRequest action to clear user data from
   * the localStorage
   */
  onClick() {
    this.props.signOutRequest(this.state);
    this.signOut();
  }
  /**
   * @return {null} navigates to the landing page
   */
  signOut() {
    this.props.history.push('/');
  }
  /**
 * @return {null} Function used to show navigation icon
 *  for navigating the webpages
 */
  show() {
    return false;
  }
    /**
   * @return {String} HTML markup for view component of CreateGroup
   */
  render() {
    return (
      <div>
        <NavBar redirectUrl = {'#'}
        signOut={this.signOut} show={this.show}/>
        <WhiteBar />
        <div className="container-fluid">
          <div className="row">
            <div className="col m3 col s12">
              <GroupList />
            </div>
            <div className="col m9 col s12">
              <AddUser />
            </div>
          </div>
        </div>
        <GroupModal />
      </div>
    );
  }
}

CreateGroup.propTypes = {
  signInRequest: PropTypes.func,
  forgetPasswordRequest: PropTypes.func,
};
const mapStateToProps = (state) => {
  const { signin } = state;
  return {
    signin
  };
};


export default connect(mapStateToProps,
  { fetchUserGroupRequest, signOutRequest })(withRouter(CreateGroup));

