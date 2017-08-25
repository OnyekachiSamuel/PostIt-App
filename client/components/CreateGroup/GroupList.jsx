import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';

/**
 * @class GroupList
 */
class GroupList extends Component {
  /**
   * @return {null} triggers the action that fetches groups a user belongs to on component mount
   */
  componentDidMount() {
    if (localStorage.token) {
      const { signin } = this.props;
      this.props.fetchUserGroupRequest(signin.user.userId);
    }
  }
  /**
 * @return {String} HTML markup for view component SignInModal
 */
  render() {
    const { groups } = this.props;
    let groupComponent;
    if (groups.length > 0) {
      groupComponent = groups.map((group, index) => {
        return (
              <div className="btn-margin" key={index}><Link to={`${group.groupId}`}>{group.groupName}</Link></div>
        );
      });
    } else {
      groupComponent = <div className="center">No group created yet</div>;
    }
    return (
      <div className="shift-left">
        <button className="waves-effect waves-light btn create-btn" data-target="modal3">
          Create group</button>
        <div>
              <div>
                <h3 className="center">Groups</h3>
                  <div className="container center group-box">
                    {groupComponent}
                 </div>
                 </div>
            </div>
        </div>
    );
  }
}

GroupList.propTypes = {
  fetchGroupRequest: PropTypes.func
};

const mapStateToProps = (state) => {
  const { groups } = state;
  const { signin } = state;
  return {
    groups,
    signin
  };
};

export default connect(mapStateToProps, { fetchUserGroupRequest })(GroupList);
