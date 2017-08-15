import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @class SignUpModal
 */
class SignUpModal extends React.Component {
  /**
   * @return {null} Initializes the state and method binding
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @return {null} Triggers the signupRequest action on submit button click
   * @param {e} e
   */
  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    this.props.signupRequest(this.state).then(
      () => {

      },
      () => {
      }
    );
  }
  /**
   * @return {null} Updates the state as the user types into the input field
   * @param {e} e
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  /**
   * @return {String} HTML markup for view component of SignUpModal
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="row modal" id="modal1">
        <div className="modal-content">
          <div className="modal-title row">
        <div className="col s6 m6">
           <h4>Sign up</h4>
       </div>
       <div className="close-modal">
           <Link to="#" className="modal-close">Close</Link>
       </div>
       </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row test">
              <div className="input-field col s12 test">
                <input id="name" name='name' value={this.state.name}
                type="text" onChange={this.onChange} className="validate"/>
                <label htmlFor="name">Name</label>
                { errors.name && <span>{ errors.name }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="user_name" name="username" value={this.state.username}
                onChange={this.onChange} type="text" className="validate"/>
                <label htmlFor="user_name">Username</label>
                { errors.username && <span>{ errors.username }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="email" name="email" value={this.state.email}
                onChange={this.onChange} type="email" className="validate"/>
                <label htmlFor="email">Email</label>
                { errors.email && <span>{ errors.email }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="password" name='password' value={this.state.password}
                onChange={this.onChange} type="password" className="validate"/>
                <label htmlFor="password">Password</label>
                { errors.password && <span>{ errors.password }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="confirm_password" name='confirmPassword'
                value={this.state.confirmPassword}
                onChange={this.onChange} type="password" className="validate"/>
                <label htmlFor="confirm_password">Confirm password</label>
                { errors.confirmPassword && <span>{ errors.confirmPassword }</span>}
              </div>
            </div>
            <button className="btn waves-effect waves-light"
            disabled={this.state.isLoading} type="submit" name="action">Submit</button>
            <div className="modal-footer">
              <Link to="#!"></Link>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

SignUpModal.propTypes = {
  signupRequest: PropTypes.func.isRequired
};

export default withRouter(SignUpModal);

