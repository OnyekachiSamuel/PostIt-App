import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchMembersRequest } from '../../actions/fetchMembers';


/**
 * @class ViewMembers
 */
export class ViewMembers extends React.Component {
  /**
   * Executes asyn operation to get all members in a particular group
   * Triggers asyn action that updates the store with
   * group members data
   * @return {null} This method returns nothing
   */
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.fetchMembersRequest(groupId);
  }

  /**
  * Renders view component of members
  * @return {String} HTML markup for view component of members
  */
  render() {
    const members = this.props.fetchMembers;
    let memberComponent;
    if (members.length > 0) {
      memberComponent = members.map((member, index) => {
        return (
          <div className="center" key={index}>
            <Link to="#">{member.username}</Link></div>

        );
      });
    }
    return (
      <div className="row modal" id="modal4">
        <div className="modal-content">
          <div className="modal-title row">
            <div className="col s6 m6 center">
              <Link to="#" className="white-text notClickable">Members</Link>
            </div>
            <div className="close-modal">
              <Link to="#" className="modal-close">Close</Link>
            </div>
          </div>
          <div>
            {memberComponent}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { fetchMembers } = state;
  return {
    fetchMembers
  };
};


export default connect(mapStateToProps,
{ fetchMembersRequest })(withRouter(ViewMembers));
