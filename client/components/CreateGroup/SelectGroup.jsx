import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroupRequest } from '../../actions/fetchGroup';

/**
 * @class
 */
class SelectGroup extends Component {
  /**
   * @return {null} triggers action to fetch groups when component has mounted
   */
  componentDidMount() {
    if (localStorage.token) {
      this.props.fetchGroupRequest();
    }
  }
  /**
   * @return {String} HTML markup for view component of SelectGroup
   */
  render() {
    const { groups } = this.props;
    let groupComponent;
    if (groups.length > 0) {
      groupComponent = groups.map((group, index) => {
        return (
              <div className="group-list container" key={index}>
              <div className="center"><Link to={`${group.groupId}`}>
                {group.groupName}
                </Link>
              </div>
                </div>
        );
      });
    } else {
      groupComponent = <div className="center">No group created yet</div>;
    }
    return (
        <div className="tt">
        <div className="groups">
                <div className="gp-title">
                    <h3>Groups</h3>
                </div>
                {groupComponent}
            </div>
        </div>
    );
  }
}

SelectGroup.propTypes = {
  fetchGroupRequest: PropTypes.func
};

const mapStateToProps = (state) => {
  const { groups } = state;
  return {
    groups
  };
};

export default connect(mapStateToProps, { fetchGroupRequest })(SelectGroup);
