import React from 'react';
import { connect } from 'react-redux';
import { fetchGroupRequest } from '../../actions/fetchGroup';
import fetchGroupPostRequest from '../../actions/fetchGroupPost';

/**
 * @class
 */
class SelectGroup extends React.Component {
  /**
   * @return {null} Initializes the state
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @return {null} Triggers the fetchGroupRequest action to fetch groups on component mount
   */
  componentDidMount() {
    if (localStorage.token) {
      this.props.fetchGroupRequest();
    }
  }
  /**
   * @return {null} Updates the state
   * @param {e} e
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  /**
   * @return {null} Triggers the action to fetch all posts in a particular group
   */
  onClick() {
    if (this.state.groupId) {
      this.props.fetchGroupPostRequest(this.state.groupId);
    }
  }
  /**
   * @return {String} HTML markup for view component of SelectGroup
   */
  render() {
    const { groups } = this.props;
    const { groupPost } = this.props;
    let selectGroup, groupPostComponent;
    if (groups.length > 0) {
      selectGroup = groups.map((group, index) => {
        return (
            <option value={group.groupId} key={index}>{group.groupName}</option>
        );
      });
    }
    if (groupPost.length > 0) {
      groupPostComponent = groupPost.map((post, index) => {
        return (
        <li key={index}>
          <div className="collapsible-header">
            <i className="material-icons">explore</i>{post.priority}</div>
          <div className="collapsible-body"><span>{post.message}</span></div>
            </li>
        );
      });
    }
    return (
      <div>
    <div className="select-group">
        <div className="center container">
            <select className="browser-default" name="groupId" onChange={this.onChange}>
                <option value="" defaultValue>Select Group</option>
                {selectGroup}
            </select>
            <div/>
            <div className="center">
              <button className="btn waves-effect waves-light" onClick={this.onClick}>View</button>
            </div>
        </div>
    </div>
    <div className="container">
        <div className="card-panel row messages">
          <h3 className="center">Messages</h3><hr/>
          <ul className="collapsible" data-collapsible="accordion">
            {groupPostComponent}
          </ul>
        </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { groups } = state;
  const { groupPost } = state;
  return {
    groups,
    groupPost
  };
};


export default connect(mapStateToProps, { fetchGroupPostRequest, fetchGroupRequest })(SelectGroup);

