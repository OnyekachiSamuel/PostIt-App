import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groupAction';

/**
 * @class
 */
export class SelectGroup extends Component {
  /**
   * @return {null} Initializes the state
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      description: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @return {null} Triggers the createGroup action that updates the store
   *  with group details
   * @param {event} event
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state);
    this.setState({ groupName: '', description: '' });
  }
  /**
   * @return {null} updates the state with group details as the user types
   * into the input fields
   * @param {event} event
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   * @return {String} HTML markup for view component of GroupModal
   */
  render() {
    return (
      <div className="row modal" id="modal3">
        <div className="modal-content">
          <div className="modal-title row">
            <div className="col s6 m6">
              <Link to="#" className="white-text">Group Details</Link>
            </div>
            <div className="close-modal">
              <Link to="#" className="modal-close">Close</Link>
            </div>
          </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="groupName" name="groupName"
                 value={this.state.groupName}
                  onChange={this.onChange} type="text"
                  className="validate" required />
                <label htmlFor="groupName">Group name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="description" name="description"
                value={this.state.description}
                  onChange={this.onChange} type="text" className="validate" />
                <label htmlFor="password">Description</label>
              </div>
            </div>
          <button className="btn waves-effect waves-light modal-close modal-btn"
              type="submit" name="action">Create</button>
            <div className="modal-footer">
              <Link to="#!"></Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SelectGroup.propTypes = {
  createGroup: PropTypes.func.isRequired
};

export default connect(null, { createGroup })(SelectGroup);

