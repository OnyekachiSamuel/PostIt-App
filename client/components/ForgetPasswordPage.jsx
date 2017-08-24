import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { resetPasswordRequest } from '../actions/forgetPasswordAction';

/**
 * @class ForgetPasswordPage
 */
class ForgetPasswordPage extends Component {
  /**
   * @return {null} Initializes the state and binds the functions  used in the component
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @return {null}  Updates the state as user types into the input fields
   * @param {e} e
   */
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  /**
   * @return {null} triggers the action that makes asyn  call for password reset
   * @param {e} e
   */
  onSubmit(e) {
    e.preventDefault();
    const token = this.props.match.params.token,
      email = this.props.match.params.email;
    this.props.resetPasswordRequest(token, email, this.state);
  }
    /**
   * @return {String} HTML markup for view component of forgetPasswordReducer
   */
  render() {
    const { forgetPassword } = this.props;
    return (
      <div>
        <header>
          <nav>
            <div className="nav-wrapper" >
              <Link to="#">POST IT</Link>
            </div>
          </nav>
        <div className="align-middle center-align">
        { forgetPassword.message &&
          <div><span>{forgetPassword.message}. Click <Link to="/">here </Link>to login</span></div>}
        { forgetPassword.error &&
          <div><span>{forgetPassword.error}</span></div>}
          <div>
         <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <input id="password" type="password" placeholder="Password" name="password"
            value={this.state.password} className="validate" onChange={this.onChange} required />
          </div>
            <div className="input-field">
            <input id="confirmPassword" type="password" name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Confirm password" className="validate" onChange={this.onChange} required />
            </div>
            <button className="btn waves-effect waves-light"
            type="submit" name="action">Submit</button>
         </form>
      </div>
      </div>
        </header>
      </div>
    );
  }
}

ForgetPasswordPage.propTypes = {
  forgetPasswordRequest: PropTypes.func
};

const mapStateToProps = (state) => {
  const { forgetPassword } = state;
  return {
    forgetPassword
  };
};

export default connect(mapStateToProps, { resetPasswordRequest })(withRouter(ForgetPasswordPage));
