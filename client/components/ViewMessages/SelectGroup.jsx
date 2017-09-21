import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { fetchGroupPostRequest, updateGroupId, viewPost } from '../../actions/fetchGroupPost';
import { archiveMessageRequest } from '../../actions/archiveMessage';

/**
 * @class
 */
export class SelectGroup extends React.Component {
  /**
   * @return {null} Initializes the state
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      viewed: false,
      posts: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @return {null} Triggers the fetchGroupRequest action to fetch groups on component mount
   */
  componentDidMount() {
    const { signin } = this.props;
    this.props.fetchUserGroupRequest(signin.user.userId);
    this.props.viewPost({ clicked: true });
  }
  /**
   * @return {null} Updates the state with empty posts array
   */
  componentWillUnmount() {
    this.setState({
      posts: []
    });
  }

/**
 * @return {null} Updates the state with groupId as the user selects a group
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
      this.props.fetchGroupPostRequest(this.state.groupId)
      .then(() => {
        this.setState({
          posts: this.props.groupPost.data,
          viewed: true
        });
      });
    }
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
  /**
   * @return {String} HTML markup for view component of SelectGroup
   */
  render() {
    const { groups } = this.props;
    // const { groupPost } = this.props;
    let selectGroup, groupPostComponent;
    if (groups.length > 0) {
      selectGroup = groups.map((group, index) => {
        return (
          <option value={group.groupId} key={index}>{group.groupName}</option>
        );
      });
    }

    if (this.state.posts && !this.props.groupPost.clicked && this.state.posts.length > 0) {
      groupPostComponent = this.state.posts.map((post, index) => {
        return (
            <div key={index}>
            <div className="post"><p>Posted by <b>{post.username}</b></p></div>
            <div className="post-date"><p>{this.formatPostTime(post.createdAt)}</p></div>
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
              <div />
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
              <div className="input-field container posts" >
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

export default connect(mapStateToProps,
  {
    fetchGroupPostRequest,
    fetchUserGroupRequest,
    archiveMessageRequest,
    updateGroupId,
    viewPost
  })(SelectGroup);

