import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postRequest } from '../../actions/postAction';

/**
 * @class ComposeMessage
 */
export class ComposeMessage extends Component {
/**
 * Initializes the state
 * @param {obj} props
 * @return {null} This method returns nothing
 */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      priority: 'Normal'
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.groupId = '';
  }

  /**
   * Updates the state as the user types into the input field
   * @param {event} event
   * @return {null} This method returns nothing
   */
  onChange(event) {
    this.groupId = this.props.match.params.groupId;
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /**
   * Triggers the postRequest action on click of submit button
   * @param {event} event
   * @return {null} This method returns nothing
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.postRequest(this.state, this.groupId);
    this.setState({ message: '' });
  }

  /**
   * HTML markup for view component of ComposeMessage
   * @return {String} Returns html markup
   */
  render() {
    return (
      <div>
        <div className="center">
        <button className="waves-effect waves-light btn create-btn"
          data-target="modal4">View members</button>
          </div>
        <div className="input-field col s12 container">
          <form onSubmit={this.onSubmit} id="formData" >
            <div>
              <textarea placeholder=" type in your message to post here"
               name="message"
                value={this.state.message}
                ref="message" onChange={this.onChange} className="type-text"
                required ></textarea>
              <label htmlFor="textarea1"></label>
            </div>
            <p>Select message priority below</p>
            <div>
              <select className="browser-default" name="priority"
              onChange={this.onChange} id="select">
                <option value="Normal" defaultValue>Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <button type="submit"
              className="btn waves-effect waves-light col s5 modal-btn">
              Post</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { postRequest })(withRouter(ComposeMessage));
