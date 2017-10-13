import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';

/**
 * @class GroupList
 */
export class GroupList extends Component {

  /**
   * @return {null} triggers the action that fetches groups a user belongs
   * to on component mount
   */
  componentDidMount() {
    const { signin } = this.props;
    this.props.fetchUserGroupRequest(signin.user.userId);
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
          <div className="card center" key={index}>
            <Link to={`${group.groupId}/${group.groupName}/post`}>{group.groupName}</Link>
          </div>
        );
      });
    } else {
      groupComponent = <div className="center">No group created yet</div>;
    }
    return (
      <div>
        <div className="center">
          <button className="waves-effect waves-light create-btn btn"
            data-target="modal3">
            Create group</button>
        </div>
        <div>
          <div>
            <h3 className="center">Groups</h3>
            <div className="scroll">
              {groupComponent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupList.propTypes = {
  fetchGroupRequest: PropTypes.func,
  fetchUserGroupRequest: PropTypes.func
};

export const mapStateToProps = (state) => {
  const { groups } = state;
  const { signin } = state;
  return {
    groups,
    signin
  };
};

export default connect(mapStateToProps, { fetchUserGroupRequest })(GroupList);

