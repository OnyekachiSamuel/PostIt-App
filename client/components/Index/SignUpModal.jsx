import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { googleAuthRequest } from '../../actions/googleAction';


/**
 * @class SignUpModal
 */
export class SignUpModal extends React.Component {
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
   * @return {null} Triggers the signupRequest action on submit button click
   * @param {event} event
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
   * @return {null} Updates the state as the user types into the input field
   * @param {event} event
   */
  onChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
 * @return {null} Gets the user data from google api
 * @param {obj} response
 */
  responseGoogle(response) {
    this.setState({ name: response.profileObj.name.toLowerCase(),
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: '',
      confirmPassword: '',
      phone: '' });
    this.props.googleAuthRequest(this.state);
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
           <Link to="#" className="white-text">Sign up</Link>
       </div>
       <div className="close-modal">
           <Link to="#" className="modal-close">Close</Link>
       </div>
       </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row test">
              <div className="input-field col s12 test">
                <input id="name" name='name' value={this.state.name} placeholder="Full name"
                type="text" onChange={this.onChange} className="validate"/>
                { errors.name && <span>{ errors.name }</span>}
                </div>
              <div className="input-field col s12 test">
                <input id="user_name" name="username" value={this.state.username}
                onChange={this.onChange} type="text" placeholder="Username" className="validate"/>
                { errors.username && <span>{ errors.username }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="email" name="email" value={this.state.email} placeholder="Email"
                onChange={this.onChange} type="email" className="validate"/>
                { errors.email && <span>{ errors.email }</span>}
              </div>
                 <div className="input-field col s12 test">
                <input id="phone" name="phone" value={this.state.phone} placeholder="Phone number"
                onChange={this.onChange} type="tel" className="validate"/>
                { errors.phone && <span>{ errors.phone }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="password" name='password' value={this.state.password}
                placeholder="Password"
                onChange={this.onChange} type="password" className="validate"/>
                { errors.password && <span>{ errors.password }</span>}
              </div>
              <div className="input-field col s12 test">
                <input id="confirm_password" name='confirmPassword'
                value={this.state.confirmPassword} placeholder="Confirm password"
                onChange={this.onChange} type="password" className="validate"/>
                { errors.confirmPassword && <span>{ errors.confirmPassword }</span>}
              </div>
            </div>
             <div className="center google-login">
              <GoogleLogin
                clientId="195109658910-hgbqa30ei6r1bd58o0i8q1u77j0l15vt.apps.googleusercontent.com"
                buttonText="+Google SignUp"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                />
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
  signUpRequest: PropTypes.func.isRequired,
  googleAuthRequest: PropTypes.func.isRequired
};

export default connect(null, { googleAuthRequest })(withRouter(SignUpModal));

