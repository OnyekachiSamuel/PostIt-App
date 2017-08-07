import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsersRequest } from '../../actions/fetchUsers';
import { addUserRequest } from '../../actions/addUserAction';


class AddUser extends Component {
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
 componentDidMount() {
   this.props.fetchUsersRequest();
 }

  filterUsers() {
    const search = this.state.search.trim().toLowerCase();
    const filteredUsers = this.props.users.filter(user => user.username.toLowerCase().indexOf(search) !== -1);
    this.setState({ users: filteredUsers });
  }
  handleSearch(event) {
    this.setState({ search: event.target.value }, () => {
      if (this.state.search === '') {
        this.setState({ users: [] });
      } else {
        this.filterUsers();
      }
    });
  }
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
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
      Materialize.toast('You must select a group and a user before clicking the add button', 2000, 'green white-text rounded');
    }
  }
  render() {
    const { groups } = this.props;
    const { users } = this.state;
    let groupComponent;
    if (groups && groups.length > 0) {
      groupComponent = groups.map((group, index) => {
        return (
                <option value={group.groupId} key= {index} ref= {group.groupId}>{group.groupName}</option>
        );
      });
    } else {
      groupComponent =
                <option value="1" ref= "group">No Group Created yet</option>;
    }
    const filteredUsers = users.map((user, index) => (
      <p key={index}>
        <input type="checkbox" onClick={this.onChange} value={user.username} id={user.id} name="username"/>
        <label htmlFor={user.id}>{user.username}</label>
      </p>
    )
    );

    return (
        <div className="container search">
            <form id="search-site" onSubmit={this.onSubmit}>
                <select className="browser-default" value={this.state.groupId} name="groupId" onChange={ this.onChange }>
                <option value="1" defaultValue>Select Group</option>
                {groupComponent}
            </select>
                <div className="input-group">
                    <div className="input-field">
                    <input id="search" placeholder="Search users" onChange={this.handleSearch} type="search" name='q'/>
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
    users
  };
};

export default connect(mapStateToProps, { fetchUsersRequest, addUserRequest })(AddUser);
