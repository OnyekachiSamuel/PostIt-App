import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';
import { fetchPostRequest } from '../../actions/fetchPostAction';
import { updateGroupInfo } from '../../actions/fetchGroupPost';

/**
 * @class PostedMessage
 */
export class PostedMessage extends Component {
  /**
 * @return {null} Updates the store with group posts by triggering the fetchPostRequest action
 */
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    const groupName = this.props.match.params.groupName;
    const { signin } = this.props;
    this.props.fetchPostRequest(groupId, signin.user.userId);
    this.props.updateGroupInfo({ groupId, groupName });
  }
  /**
   * @return {string} Returns the string output for the formatted date
   * @param {string} date
   */
  formatPostTime(date) {
    if (date) {
      const testTime = moment(date).fromNow().split(' ');
      let time = moment(date).fromNow();
      if (testTime.includes('hours') && testTime[0] < 23) {
        time = moment(date).calendar();
      } else if (testTime[0] > 23) {
        time = moment(date).fromNow();
      }
      return time;
    }
  }
  /** object destructing of messages from the props
   * @return {String} HTML markup for view component of PostedMessage
   */
  render() {
    const { messages } = this.props;
    let messageComponent;
    if (messages && messages.length > 0) {
      messageComponent = messages.map((element, index) => {
        return (
            <div key={index}>
            <div className="post"><p>Posted by <b>{element.username}</b></p></div>
            <div className="post-date message-body">
              <p>{this.formatPostTime(element.createdAt)}</p></div>
            <input disabled value={element.message} id="disabled" type="text"
              className="validate" style={{ color: 'green' }} />
              </div>
        );
      });
    } else {
      messageComponent = <p className="center">No message posted yet</p>;
    }
    return (
      <div className="shift-right">
        <Link className="waves-effect waves-light btn create-btn group-message"
          to="/messages">View message board</Link>
        <div>
          <h3 className="center">Messages</h3>
          <div className="input-field container posts">
            {messageComponent}
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { post } = state;
  const { signin } = state;
  return {
    messages: post,
    signin
  };
};

export default connect(mapStateToProps,
{ fetchPostRequest, updateGroupInfo })(withRouter(PostedMessage));
