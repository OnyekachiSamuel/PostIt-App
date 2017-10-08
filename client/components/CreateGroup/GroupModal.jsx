import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groupAction';

/**
 * @class
 */
export class GroupModal extends Component {
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
      <div className="modal" id="modal3">
        <div className="modal-content">
          <div className="modal-title">
            <div className="row">
              <div className="col m8 s8">
                <Link to="#" className="white-text">Group Details</Link>
              </div>
              <div className="close-modal col m2 s2">
                <Link to="#" className="modal-close white-text">Close</Link>
              </div>
            </div>
          </div>
          <form method="post" onSubmit={this.onSubmit} id="formData">
            <div className="row">
              <div className="input-field col s12">
                <input id="groupName" name="groupName"
                  value={this.state.groupName}
                  onChange={this.onChange}
                  type="text"
                  className="validate" required />
                  <label htmlFor="groupName">Group name</label>
              </div>
            </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="description" name="description"
                    value={this.state.description}
                    onChange={this.onChange} type="text" className="validate" />
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <button className="btn waves-effect waves-light modal-close modal-btn col s12"
                    type="submit" name="action">Create</button>
                </div>
                </div>
            <div className="modal-footer">
              <Link to="#!"></Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


GroupModal.propTypes = {
  createGroup: PropTypes.func.isRequired
};

export default connect(null, { createGroup })(GroupModal);

