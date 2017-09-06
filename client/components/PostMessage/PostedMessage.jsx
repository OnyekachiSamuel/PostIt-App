import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPostRequest } from '../../actions/fetchPostAction';

/**
 * @class PostedMessage
 */
export class PostedMessage extends Component {
    /**
   * @return {null} Updates the store with group posts by triggering the fetchPostRequest action
   */
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    const { signin } = this.props;
    this.props.fetchPostRequest(groupId, signin.user.userId);
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
        <div className="input-field container" key={index}>
          <div className="post"><p>Posted by <b>{element.username}</b></p></div>
            <div className="post-date"><p>{new Date(element.createdAt).toLocaleString()}</p></div>
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
    <Link className="waves-effect waves-light btn create-btn"
    to="/messages">View message board</Link>
  <div>
    <h3 className="center">Messages</h3>
    <div>
      {messageComponent}
    </div>
</div>
</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { post } = state;
  const { signin } = state;
  return {
    messages: post,
    signin
  };
};

export default connect(mapStateToProps, { fetchPostRequest })(withRouter(PostedMessage));
