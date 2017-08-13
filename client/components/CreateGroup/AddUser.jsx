import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsersRequest } from '../../actions/fetchUsers';
import { addUserRequest } from '../../actions/addUserAction';

/**
 * @class AddUser
 */
class AddUser extends Component {
  /**
   * Initialize the state and bind functions
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: [],
      username: '',
      groupId: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *@return {null} Triggers the action to fetch all users after the render method has been executed
   */
  componentDidMount() {
    if (localStorage.token) {
      this.props.fetchUsersRequest();
    }
  }
/**
 *@return {null} Updates the state with array of filtered users matching search name
 */
  filterUsers() {
    const search = this.state.search.trim().toLowerCase();
    const filteredUsers = this.props.users
    .filter((user) => { return user.username.toLowerCase().indexOf(search) !== -1; });
    this.setState({ users: filteredUsers });
  }
  /**
   * @return {null} Updates the state with filtered users
   * @param {event} event handler for search
   */
  handleSearch(event) {
    this.setState({ search: event.target.value }, () => {
      if (this.state.search === '') {
        this.setState({ users: [] });
      } else {
        this.filterUsers();
      }
    });
  }
  /**
   * @return {null} Updates the state as the user types into the input field
   * @param {event} event onChange handler function
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   * @return {null} triggers an addUserRequest action on click of submit button
   * @param {e} e
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.state.username && this.state.groupId) {
      const ids = {
        username: this.state.username,
        groupId: this.state.groupId
      };
      this.props.addUserRequest(ids, this.state.groupId);
      this.state.groupId = '';
      this.state.username = '';
      this.setState({ users: [] });
    } else {
      Materialize.toast('You must select a group and a user before clicking the add button',
       2000, 'green white-text rounded');
    }
  }
  /**
   * @return {String} HTML markup for view component of AddUser
   * render method is meant to contain pure function and not mutate the state
   */
  render() {
    const { groups } = this.props;
    const { users } = this.state;
    let groupComponent;
    if (groups && groups.length > 0) {
      groupComponent = groups.map((group, index) => {
        return (
                <option value={group.groupId}
                key= {index} ref= {group.groupId}>{group.groupName}</option>
        );
      });
    } else {
      groupComponent =
                <option value="1" ref= "group">No Group Created yet</option>;
    }
    const filteredUsers = users.map((user, index) => {
      return (
      <p key={index}>
        <input type="checkbox" onClick={this.onChange}
        value={user.username} id={user.id} name="username"/>
        <label htmlFor={user.id}>{user.username}</label>
      </p>
      );
    }
    );

    return (
        <div className="container search">
            <form id="search-site" onSubmit={this.onSubmit}>
                <select className="browser-default" value={this.state.groupId}
                name="groupId" onChange={ this.onChange }>
                <option value="1" defaultValue>Select Group</option>
                {groupComponent}
            </select>
                <div className="input-group">
                    <div className="input-field">
                    <input id="search" placeholder="Search users"
                    onChange={this.handleSearch} type="search" name='q'/>
                        <label className="label-icon" htmlFor="search">
                            <i className="material-icons">search</i>
                        </label>
                    </div>
                    <button type="submit" className="input-group-addon btn">Add</button>
                </div>
                {filteredUsers}
            </form>
        </div>
    );
  }
}

AddUser.propTypes = {
  fetchUsersRequest: PropTypes.func.isRequired,
  addUserRequest: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { groups } = state;
  const { users } = state;
  return {
    groups,
    users,
  };
};

export default connect(mapStateToProps, { fetchUsersRequest, addUserRequest })(AddUser);
