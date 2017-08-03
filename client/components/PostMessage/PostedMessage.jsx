import React from 'react';
import { connect } from 'react-redux';

class PostedMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { messages } = this.props;
    let messageComponent;
    if (messages.length > 0) {
      messageComponent = messages.map((element) => {
        return (
           <li key={element.groupId}>
              <div className="collapsible-header"><i className="material-icons">explore</i>{element.priority}</div>
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
            {/*<li>
              <div className="collapsible-header"><i className="material-icons">explore</i>Critical</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">explore</i>Normal</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">explore</i>Normal</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>*/}
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

export default connect(mapStateToProps)(PostedMessage);
