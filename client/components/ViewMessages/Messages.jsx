import React from 'react';
import { connect } from 'react-redux';

/**
 * @class Messages
 */
class Messages extends React.Component {
  /**
   * @return {String} HTML markup for view component of Messages
   */
  render() {
    const { groupPost } = this.props;
    const groupPostComponent = groupPost.map((group, index) => {
      return (
        <li key={index}>
              <div className="collapsible-header"><i className="material-icons">
                  explore</i>{group.priority}</div>
              <div className="collapsible-body"><span>{group.message}</span></div>
            </li>
      );
    });
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <ul className="collapsible" data-collapsible="accordion">
            {groupPostComponent}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { groupPost } = state;
  return {
    groupPost
  };
};

export default connect(mapStateToProps)(Messages);
