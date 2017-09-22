import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import ReactPaginate from 'react-paginate';
import { fetchUsersRequest } from '../../actions/fetchUsers';
import { addUserRequest } from '../../actions/addUserAction';
import { fetchGroupUsers } from '../../actions/groupAction';

/**
 * @class AddUser
 */
export class AddUser extends Component {
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
      usernames: [],
      offset: 0,
      limit: 5
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSelectUser = this.onSelectUser.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }
  /**
   * @return {null} Updates the state as the user types into the input field
   * @param {event} event onChange handler function
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
    this.props.fetchGroupUsers(this.state.groupId);
  }
  /**
   * @return {null} Updates the state and adds a user on click of checkbox
   * @param {event} event
   */
  onSelectUser(event) {
    let index;
    const usernames = this.state.usernames,
      item = event.target.value;
    if ((usernames.length > 0) && (usernames.indexOf(item) === -1)) {
      this.state.usernames.push(item);
    } else if (usernames.length === 0) {
      this.state.usernames.push(item);
    } else if (usernames.indexOf(item) >= 0) {
      index = this.state.usernames.indexOf(item);
      this.state.usernames.splice(index, 1);
    }
  }
  /**
   * @return {null} triggers an addUserRequest action on click of submit button
   * @param {event} event
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.state.usernames && this.state.groupId) {
      this.state.usernames.forEach((user) => {
        const ids = {
          username: user,
          groupId: this.state.groupId
        };
        this.props.addUserRequest(ids, this.state.groupId);
      });
      this.setState({ users: [], usernames: [] });
    } else {
      Materialize.toast('You must select a group and a user before clicking the add button',
        2000, 'green white-text rounded');
    }
  }
  /**
   * @return {null} Updates the state as the user types
   * @param {event} event
   */
  handleSearch(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.props.fetchUsersRequest(state);
  }
/**
 * @return {null} Triggers action that fetches the search match
 * @param {obj} item
 */
  handlePagination(item) {
    const selected = item.selected;
    const offset = Math.ceil(selected * 5);
    this.setState({ offset }, () => {
      this.props.fetchUsersRequest(this.state);
    });
  }
  /**
   * @return {String} HTML markup for view component of AddUser
   * render method is meant to contain pure function and not mutate the state
   */
  render() {
    const { groups, searchResult } = this.props,
      pageCount = searchResult.pageCount,
      { users } = searchResult,
      { userIds } = this.props;
    let groupComponent,
      filteredUsers;
    if (groups && groups.length > 0) {
      groupComponent = groups.map((group, index) => {
        return (
          <option value={group.groupId}
            key={index}>{group.groupName}</option>
        );
      });
    } else {
      groupComponent =
        <option value="1" ref="group">No Group Created yet</option>;
    }
    if (!isEmpty(searchResult) && users.length > 0) {
      filteredUsers = users.map((user, index) => {
        return (
         <p key={index} id="check-box">
          <input type="checkbox" className="ch-box" onClick={this.onSelectUser}
            value={user.username} id={user.id} name="username"
            disabled = {userIds.indexOf(user.id) > 0}/>
          <label htmlFor={user.id}>{user.username}</label>
         </p>
        );
      }
    );
    }
    return (
      <div className="shift-right">
        <div className="container">
          <h3 className="center white green-text"> select and add user(s) to a group</h3>
          <div className="select-margin">
            <select className="browser-default" value={this.state.groupId}
              name="groupId" onChange={this.onChange}>
              <option value="1" defaultValue>Select Group</option>
              {groupComponent}
            </select>
          </div>
          <div>
            <form id="search-site" onSubmit={this.onSubmit}>
              <div className="input-group">
                <div className="input-field">
                  <input id="search" placeholder="Search users" value={this.state.search}
                    onChange={this.handleSearch} type="search" name='search' />
                  <label className="label-icon" htmlFor="search">
                    <i className="material-icons" >search</i>
                  </label>
                </div>
                <button type="submit" className="input-group-addon btn">Add</button>
              </div>
              { !isEmpty(searchResult) && filteredUsers}
            </form>
          </div>
        </div>
        <div className="paginate-btn">
          <ReactPaginate previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={<a href="">...</a>}
            breakClassName={'break-me'}
            pageCount={pageCount || 0 }
            marginPagesDisplayed={1}
            pageRangeDisplayed={5}
            onPageChange={this.handlePagination}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'} />
        </div>
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
  const { searchResult } = state;
  const { userIds } = state;
  return {
    groups,
    searchResult,
    userIds
  };
};

export default connect(mapStateToProps,
{ fetchUsersRequest, addUserRequest, fetchGroupUsers })(AddUser);

