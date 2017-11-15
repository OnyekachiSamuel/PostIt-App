import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { fetchGroupPostRequest, updateGroupId, viewPost } from '../../actions/fetchGroupPost';

/**
 * @class
 */
export class SelectGroup extends React.Component {
  /**
   * Initializes the state and bind methods
   * @param {obj} props
   * @return {null} This method returns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: '',
      groupName: '',
      viewed: false,
      posts: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.formatPostTime = this.formatPostTime.bind(this);
  }

  /**
   * Triggers the fetchGroupRequest action to fetch groups on
   * component mount
   * @return {null} This method returns nothing
   */
  componentDidMount() {
    const { signin } = this.props;
    this.props.fetchUserGroupRequest(signin.user.userId);
    this.props.viewPost({ clicked: true });
  }

  /**
   * Updates the state with empty posts array
   * @return {null} This method returns nothing
   */
  componentWillUnmount() {
    this.setState({
      posts: []
    });
  }

  /**
   * Updates the state with groupId as the user selects a group
   * @param {event} event
   * @return {null} This method returns nothinf
   */
  onChange(event) {
    const state = this.state;
    const value = event.target.value.split('*');
    const groupId = Number(value[0]);
    const groupName = value[1];
    state[event.target.name] = groupId;
    state.groupName = groupName;
    this.setState(state);
  }

  /**
   * Triggers the action to fetch all posts in a particular group
   * @return {null} This method returns nothing
   */
  onClick() {
    if (this.state.groupId && this.state.groupName !== 'Select Group') {
      this.props.fetchGroupPostRequest(this.state.groupId)
        .then(() => {
          this.setState({
            posts: this.props.groupPost.posts,
            viewed: true
          });
        });
    }
  }

  /**
   * This method is used to format time string
   * @param {string} date
   * @return {string} Returns the string output for the formatted date
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
   * Renders the html markup for SelectGroup component
   * @return {String} HTML markup for view component of SelectGroup
   */
  render() {
    const { groups } = this.props;
    let groupPostComponent = <p className="center">
      Select and click the view button to view posted messages</p>;
    let selectGroup;
    if (groups.length > 0) {
      selectGroup = groups.map((group, index) => {
        return (
          <option value={`${group.groupId} * ${group.groupName} `}
           key={index}>{group.groupName}</option>
        );
      });
    }

    if (this.state.posts && !this.props.groupPost.clicked
      && this.state.posts.length > 0) {
      groupPostComponent = this.state.posts.map((post, index) => {
        return (
          <div key={index}>
            <div className="post"><p>Posted by <b>{post.username}</b></p></div>
            <div className="post-date"><p>{this.formatPostTime(post.createdAt)}
            </p></div>
            <input disabled value={post.message} id="disabled" type="text"
              className="validate posted-text" />
          </div>
        );
      });
    } else if (this.props.groupPost.message !== undefined) {
      groupPostComponent = <p className="center">
        {this.props.groupPost.message}</p>;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="whitespace">
            <div className="col m4 col s12">
              <div className="center">
                <select className="browser-default center" name="groupId"
                  onChange={this.onChange}>
                  <option value={'0 * '} defaultValue>Select Group</option>
                  {selectGroup}
                </select>
                <div />
                <div className="center view-btn">
                  <button className="btn waves-effect waves-light"
                    onClick={this.onClick}>View</button>
                </div>
              </div>
            </div>
          </div>
          <div className="whitespace">
            <div className="col m8 col s12">
              <div>
                {!this.state.viewed &&
                  <div className="card center green-text group-name">
                    Message Board</div>}
                {this.state.viewed &&
                  <div className="card center green-text group-name">
                    {`${this.state.groupName} Message Board`}
                  </div>}
                <div className="input-field container posts scroll" >
                  {groupPostComponent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export const mapStateToProps = (state) => {
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
    updateGroupId,
    viewPost
  })(SelectGroup);

