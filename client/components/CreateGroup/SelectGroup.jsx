import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchGroupRequest } from '../../actions/fetchGroup';


class SelectGroup extends Component {
  componentWillMount() {
    console.log(this.props, '====****===')
  }
  componentDidMount() {
    this.props.fetchGroupRequest();
  }
  render() {
    const { groups } = this.props;
    const { signin } = this.props;
    console.log(signin, '======signin====');
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
  const { signin } = state;
  return {
    groups,
    signin
  };
};

export default connect(mapStateToProps, { fetchGroupRequest })(SelectGroup);
