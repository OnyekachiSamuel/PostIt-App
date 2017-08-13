import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class SignInModal extends React.Component {
  /**
   * @return {null} Initializes the state and methods bindings
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @return {null} Triggers the signinRequest action on click of submit button
   * @param {e} e
   */
  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    this.props.signinRequest(this.state).then(
      () => {

      },
      () => {
        // console.log(errors);
      }
    );
  }
  /**
   * @return {null} Updates the state as the user types into the input the fields
   * @param {e} e
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
/**
 * @return {String} HTML markup for view component SignInModal
 */
  render() {
    return (
      <div className="row modal" id="modal2">
        <div className="modal-content">
          <div className="modal-title row">
            <div className="col s6 m6">
              <h4>Sign in</h4>
            </div>
            <div className="close-modal">
              <Link to="#" className="modal-close">Close</Link>
            </div>
          </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="username" name="username" value={this.state.username}
                onChange={this.onChange} type="text" className="validate" required />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name="password" value={this.state.password}
                onChange={this.onChange} type="password" className="validate" required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light"
            type="submit" name="action">Submit</button>
            <div className="modal-footer">
              <Link to="#!"></Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignInModal.propTypes = {
  signinRequest: PropTypes.func,
};
export default withRouter(SignInModal);
