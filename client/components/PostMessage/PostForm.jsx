import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postRequest } from '../../actions/postAction';

/**
 * @class PostForm
 */
class PostForm extends React.Component {
  /**
   * @return {null} Initializes the state
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      priority: ''
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
   * @param {e} e
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.postRequest(this.state, this.groupId);
    this.setState({ message: '' });
  }
  /**
   * @return {String} HTML markup for view component of PostForm
   */
  render() {
    return (
          <div className="container">
            <br/>
            <div className="post-title center">
              <h3>Compose message</h3>
              </div>
              <div className="input-field col s12">
                <form onSubmit={this.onSubmit} >
                <div>
                  <textarea placeholder="Type in your message here" name="message"
                  value={this.state.message}
                  ref="message" onChange={this.onChange} className="type-text" required ></textarea>
                      <label htmlFor="textarea1"></label>
                     </div>
                <div>
                  <select className="browser-default" name="priority" onChange={this.onChange}>
                       <option value="" defaultValue>Select priority option</option>
                       <option value="Normal">Normal</option>
                       <option value="Urgent">Urgent</option>
                       <option value="Critical">Critical</option>
                    </select>
                </div>
                <input type="submit" className="btn waves-effect waves-light col s12" value="Post"/>
                     </form>
                      </div>
                    </div>
    );
  }
}

export default connect(null, { postRequest })(withRouter(PostForm));
