import React from 'react';
import { connect } from 'react-redux';
import { fetchUserGroupRequest } from '../../actions/fetchUserGroups';
import { fetchGroupPostRequest } from '../../actions/fetchGroupPost';

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
      const { signin } = this.props;
      this.props.fetchUserGroupRequest(signin.user.userId);
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
        <div className="input-field container" key={index}>
            <input disabled value={post.message} id="disabled" type="text"
            className="validate" />
            <div className="post"><p><b>posted by {post.username}</b></p></div>
            <div className="post-date"><p>{new Date(post.createdAt).toLocaleString()}</p></div>
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
    { signin } = state;
  return {
    groups,
    groupPost,
    signin
  };
};


export default
connect(mapStateToProps, { fetchGroupPostRequest, fetchUserGroupRequest })(SelectGroup);

