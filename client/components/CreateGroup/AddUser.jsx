import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import { fetchUsersRequest } from '../../actions/fetchUsers';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      found: false
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
 componentDidMount() {
   this.props.fetchUsersRequest();
   console.log(this.props.users);
 }
  onKeyDownEvent() {
    console.log('I was clicked', this);
  }

  handleSearch(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { group } = this.props;
    let { users } = this.props;
    let groupComponent;
    if (group.length > 0) {
      groupComponent = group.map((element, index) => {
        return (
                <option value={element.groupId} key= {element.groupId} ref= {element.groupId}>{element.groupName}</option>
        );
      });
    } else {
      groupComponent =
                <option value="1" ref= "group">No Group Created yet</option>;
    }
    const searchString = this.state.search.trim().toLowerCase();

    if (searchString.length > 0) {
      users = users.filter(info => info.username.toLowerCase().match(searchString));
    }
    return (
        <div className="container search">
            <form id="search-site" action='search' method='get'>
                <select className="browser-default">
                <option value="" defaultValue>Select Group</option>
                {groupComponent}
            </select>
                <div className="input-group">
                    <div className="input-field">
                    <input id="search" placeholder="Search users" value={this.state.search} onChange={this.handleSearch} type="search" name='q'/>
                        <label className="label-icon" htmlFor="search">
                            <i className="material-icons">search</i>
                        </label>
                    </div>
                    <button type="submit" className="input-group-addon btn">Add</button>
                </div>
            </form>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { group } = state;
  const { users } = state;
  return {
    group,
    users
  };
};

export default connect(mapStateToProps, { fetchUsersRequest })(AddUser);
