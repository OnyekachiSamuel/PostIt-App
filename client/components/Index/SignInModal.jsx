import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { forgetPasswordRequest } from '../../actions/forgetPasswordAction';
import { googleAuthRequest } from '../../actions/googleAction';

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
      email: '',
      errors: {},
      visible: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  /**
   * @return {null} Triggers the signinRequest action on click of submit button
   * @param {event} event
   */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    if (!this.state.visible) {
      this.props.signInRequest(this.state);
    } else if (this.state.visible) {
      this.props.forgetPasswordRequest({ email: this.state.email }).then(() => {
        const { forgetPassword } = this.props;
        if (forgetPassword.message) {
          Materialize.toast(forgetPassword.message, 2000, 'green white-text rounded');
        } else {
          Materialize.toast(forgetPassword.error, 2000, 'yellow white-text rounded');
        }
      });
    }
    this.setState({ username: '', email: '', password: '' });
  }
  /**
   * @return {null} Updates the state as the user types into the input the fields
   * @param {event} event
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
   * @return {null} updates the component state
   */
  onClick() {
    this.setState({ visible: true });
  }
  /**
   * @return {null} updates the component state
   */
  onClickLogin() {
    this.setState({ visible: false });
  }

/**
 * @return {null} Gets the user data from google api
 * @param {obj} response
 */
  responseGoogle(response) {
    this.setState({ name: response.profileObj.name,
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: '' });
    this.props.googleAuthRequest(this.state);
  }
/**
 * @return {String} HTML markup for view component SignInModal
 */
  render() {
    return (
      <div className="row modal" id="modal2">
        <div className="modal-content">
          <div className="modal-title row">
            { !this.state.visible && <div className="col s6 m6">
              <Link to="#" className="white-text">Sign in</Link>
            </div>}
            { this.state.visible && <div className="col s6 m6">
              <Link to="#" className="white-text">Reset password</Link>
            </div>}
            <div className="close-modal">
              <Link to="#" className="modal-close">Close</Link>
            </div>
          </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row">
              { this.state.visible &&
              <div className="input-field col s12">
              <input placeholder="Enter your email to start the process"
              id="email" type="email" name="email" value={this.state.email} onChange={this.onChange}
              className="validate" required />
            </div> }
            { !this.state.visible &&
            <div className="input-field col s12">
                <input id="username" name="username" value={this.state.username}
                onChange={this.onChange} type="text" placeholder="Username"
                className="validate" required />
              </div>
            }
              { !this.state.visible &&
            <div className="input-field col s12">
            <input id="password" type="password" name="password" value={this.state.password}
            onChange={this.onChange} placeholder="Password" className="validate" required />
            </div>
            }
            </div>
            { !this.state.visible &&
              <div style={{ marginBottom: '7px' } }><span>forgot password ? Click
              <Link to="#" onClick={this.onClick}> here
            </Link> to reset your password</span></div>}
            { this.state.visible &&
              <div id="login" style={{ marginBottom: '7px' } }><span>Want to login ? Click
              <Link to="#" onClick={this.onClickLogin}> here
            </Link> to login</span></div>}
            <div className="center google-login">
              <GoogleLogin
                clientId="1096080119344-dhkm3kesj85jq2au401j1ur243vo58np.apps.googleusercontent.com"
                buttonText="+Google Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                />
            </div>
            <button className="btn waves-effect waves-light modal-close"
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
  signInRequest: PropTypes.func,
  forgetPasswordRequest: PropTypes.func,
  googleAuthRequest: PropTypes.func
};
const mapStateToProps = (state) => {
  const { forgetPassword } = state;
  return {
    forgetPassword
  };
};
export default
connect(mapStateToProps, { forgetPasswordRequest, googleAuthRequest })(withRouter(SignInModal));
