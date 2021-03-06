import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import isEmpty from 'lodash/isEmpty';
import { googleAuthRequest } from '../../actions/googleAction';


/**
 * @class SignUpModal
 */
export class SignUpModal extends React.Component {
  /**
   * Initializes the state and method binding
   * @param {obj} props
   * @return {null} This method returns nothing
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  /**
   * Triggers the signupRequest action on submit button click
   * @param {event} event
   * @return {null} This method returns nothing
   */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    this.props.signUpRequest(this.state);
    this.setState({
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  }

  /**
   * Updates the state as the user types into the input field
   * @param {event} event
   * @return {null} This method returns nothing
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

/**
 * Gets the user data from google api
 * @param {obj} response
 * @return {null} This method returns nothing
 */
  responseGoogle(response) {
    this.setState({
      name: response.profileObj.name.toLowerCase(),
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: '',
      confirmPassword: '',
      phone: ''
    });
    this.props.googleAuthRequest(this.state);
  }

  /**
   * HTML markup for view component of SignUpModal
   * @return {String} Returns html markup
   */
  render() {
    const { signup } = this.props;
    const { errors } = signup;
    return (
      <div className="row modal" id="modal1">
        <div className="modal-content">
          <div className="modal-title row">
            <div className="col s8 m8">
              <Link to="#" className="white-text notClickable">Sign up</Link>
            </div>
            <div className="close-modal">
              <Link to="#" className="modal-close">Close</Link>
            </div>
          </div>
          <form className="col s12 formData" method="post"
            onSubmit={this.onSubmit}>
            <div className="row test">
              {!isEmpty(errors) && errors.name && <span className="err-msg">
                {errors.name}</span>}
              <div className="input-field col s12 test">
                <input id="name" name='name' value={this.state.name}
                  placeholder="Full name"
                  type="text" onChange={this.onChange}
                  className="validate" required />
              </div>
              {!isEmpty(errors) && errors.username &&
                <span className="err-msg">{errors.username}</span>}
              <div className="input-field col s12 test">
                <input id="user_name" name="username"
                  value={this.state.username}
                  onChange={this.onChange} type="text"
                  placeholder="Username" className="validate" required />
              </div>
              {!isEmpty(errors) && errors.email && <span className="err-msg">
                {errors.email}</span>}
              <div className="input-field col s12 test">
                <input id="email" name="email" value={this.state.email}
                  placeholder="Email"
                  onChange={this.onChange} type="email"
                  className="validate" required />
              </div>
              {!isEmpty(errors) && errors.phone && <span className="err-msg">
                {errors.phone}</span>}
              <div className="input-field col s12 test">
                <input id="phone" name="phone" value={this.state.phone}
                  placeholder="Phone number"
                  onChange={this.onChange} type="tel"
                  className="validate" required />
              </div>
              {!isEmpty(errors) && errors.password &&
                <span className="err-msg">{errors.password}</span>}
              <div className="input-field col s12 test">
                <input id="password" name='password' value={this.state.password}
                  placeholder="Password"
                  onChange={this.onChange} type="password"
                  className="validate" required />
              </div>
              {!isEmpty(errors) && errors.confirmPassword &&
                <span className="err-msg">{errors.confirmPassword}</span>}
              <div className="input-field col s12 test confirm">
                <input id="confirm_password" name='confirmPassword'
                  value={this.state.confirmPassword}
                  placeholder="Confirm password"
                  onChange={this.onChange} type="password" className="validate"
                  required />
              </div>
            </div>
            <div className="center submit">
              <button className="btn waves-effect waves-light"
                type="submit" name="action">Submit</button></div>
            <div className="row">
              <div>
                <GoogleLogin
                  clientId="1096080119344-dhkm3kesj85jq2au401j1ur243vo58np.apps.googleusercontent.com"
                  buttonText="+Google SignUp"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  className="google-btn"
                />
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

SignUpModal.propTypes = {
  signUpRequest: PropTypes.func.isRequired,
  googleAuthRequest: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => {
  const { signup } = state;
  return {
    signup
  };
};

export default connect(mapStateToProps,
  { googleAuthRequest })(withRouter(SignUpModal));

