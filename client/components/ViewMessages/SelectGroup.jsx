import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { fetchGroupPostRequest, updateGroupId } from '../../actions/fetchGroupPost';
import { archiveMessageRequest } from '../../actions/archiveMessage';

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
      clicked: true
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.archiveHandler = this.archiveHandler.bind(this);
  }
  /**
   * @return {null} Triggers the fetchGroupRequest action to fetch groups on component mount
   */
  componentDidMount() {
    if (localStorage.token) {
      const { signin } = this.props;
      this.props.fetchUserGroupRequest(signin.user.userId);
    }
  }
  /**
   * @return {null} Updates the state
   * @param {event} event
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   * @return {null} Triggers the action to fetch all posts in a particular group
   */
  onClick() {
    if (this.state.groupId) {
      this.props.fetchGroupPostRequest(this.state.groupId);
      this.props.updateGroupId({ Id: this.state.groupId });
      this.setState({ clicked: true });
    }
  }
  /**
   * @return {null} Returns null; Triggers action to archive read messages
   */
  archiveHandler() {
    const { groupId } = this.props;
    if (groupId.Id) {
      this.props.archiveMessageRequest(groupId.Id).then(() => {
        Materialize.toast('Message(s) successfully archived', 2000, 'green white-text rounded');
      });
      this.setState({ clicked: false });
    }
  }
  /**
   * @return {String} HTML markup for view component of SelectGroup
   */
  render() {
    const { groups } = this.props;
    const { groupPost } = this.props;
    const groupCreator = groupPost.groupCreator;
    let selectGroup, groupPostComponent;
    if (groups.length > 0) {
      selectGroup = groups.map((group, index) => {
        return (
            <option value={group.groupId} key={index}>{group.groupName}</option>
        );
      });
    }
    if (!isEmpty(groupPost)) {
      groupPostComponent = groupPost.data.map((post, index) => {
        return (
        <div className="input-field container" key={index}>
           <div className="post"><p>Posted by <b>{post.username}</b></p></div>
            <div className="post-date"><p>{new Date(post.createdAt).toLocaleString()}</p></div>
            <input disabled value={post.message} id="disabled" type="text"
            className="validate" style={{ color: 'green' }} />
        </div>
        );
      });
    } else {
      groupPostComponent = <p className="center">Select a group to view posted messages</p>;
    }
    return (
      <div>
      <div className="whitespace">
    <div className="shift-left">
        <div className="center container">
            <select className="browser-default" name="groupId" onChange={this.onChange}>
                <option value="" defaultValue>Select Group</option>
                {selectGroup}
            </select>
            <div/>
            <div className="center view-btn">
              <button className="btn waves-effect waves-light" onClick={this.onClick}>View</button>
            </div>
        </div>
    </div>
    </div>
    <div className="whitespace">
    <div className="shift-right">
        <div>
        <h3 className="center">Message Board</h3>
        <div>
          {groupPostComponent}
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { groups } = state;
  const { groupPost } = state,
    { signin } = state,
    { groupId } = state;
  return {
    groups,
    groupPost,
    signin,
    groupId
  };
};


export default
connect(mapStateToProps,
  { fetchGroupPostRequest,
    fetchUserGroupRequest,
    archiveMessageRequest,
    updateGroupId })(SelectGroup);

