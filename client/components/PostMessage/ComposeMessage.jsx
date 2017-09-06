import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postRequest } from '../../actions/postAction';

/**
 * @class ComposeMessage
 */
export class ComposeMessage extends Component {
    /**
   * @return {null} Initializes the state
   * @param {obj} props
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
   * @return {null} Updates the state as the user types into the input field
   * @param {event} event
   */
  onChange(event) {
    this.groupId = this.props.match.params.groupId;
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   * @return {null} Triggers the postRequest action on click of submit button
   * @param {event} event
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.postRequest(this.state, this.groupId);
    this.setState({ message: '' });
  }
  /**
   * @return {String} HTML markup for view component of ComposeMessage
   */
  render() {
    return (
      <div className="shift-left">
        <button className="waves-effect waves-light btn create-btn"
        data-target="modal4">View members</button>
        <div className="input-field col s12 container">
            <form onSubmit={this.onSubmit} >
                <div>
                    <textarea placeholder="Type in your message here" name="message"
                  value={this.state.message}
                  ref="message" onChange={this.onChange} className="type-text" required ></textarea>
                    <label htmlFor="textarea1"></label>
                </div>
                <div>
                    <select className="browser-default" name="priority" onChange={this.onChange}>
                        <option value="Normal" defaultValue>Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Critical">Critical</option>
                    </select>
                </div>
                <button type="submit"
                className="btn waves-effect waves-light col s12 modal-btn">Post</button>
            </form>
        </div>
    </div>
    );
  }
}

export default connect(null, { postRequest })(withRouter(ComposeMessage));
