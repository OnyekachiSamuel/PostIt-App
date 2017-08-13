import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPostRequest } from '../../actions/fetchPostAction';

/**
 * @class PostedMessage
 */
class PostedMessage extends React.Component {
  /**
   * @return {null} Updates the store with group posts by triggering the fetchPostRequest action
   */
  componentDidMount() {
    if (localStorage.token) {
      const groupId = this.props.match.params.groupId;
      this.props.fetchPostRequest(groupId);
    }
  }
  /** object destructing of messages from the props
   * @return {String} HTML markup for view component of PostedMessage
   */
  render() {
    const { messages } = this.props;
    let messageComponent;
    if (messages.length > 0) {
      messageComponent = messages.map((element, index) => {
        return (
           <li key={index}>
              <div className="collapsible-header">
                <i className="material-icons">explore</i>{element.priority}</div>
              <div className="collapsible-body"><span>{element.message}</span></div>
        </li>
        );
      });
    }
    return (
      <div className="container">
        <div className="card-panel row messages">
          <h3 className="center">Messages</h3><hr/>
          <ul className="collapsible" data-collapsible="accordion">
            {messageComponent}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { post } = state;
  return {
    messages: post
  };
};

export default connect(mapStateToProps, { fetchPostRequest })(withRouter(PostedMessage));
