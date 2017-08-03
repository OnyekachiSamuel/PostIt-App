import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';


class SignUpModal extends React.Component {
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
  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    this.props.signupRequest(this.state);
  }
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
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
           <a href="#" className="modal-close">Close</a>
       </div>
       </div>
          <form className="col s12" method="post" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="name" name='name' value={this.state.name}
                type="text" onChange={this.onChange} className="validate"/>
                <label htmlFor="name">Name</label>
                { errors.name && <span>{ errors.name }</span>}
              </div>
              <div className="input-field col s12">
                <input id="user_name" name="username" value={this.state.username} onChange={this.onChange} type="text" className="validate"/>
                <label htmlFor="user_name">Username</label>
                { errors.username && <span>{ errors.username }</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" name="email" value={this.state.email} onChange={this.onChange} type="email" className="validate"/>
                <label htmlFor="email">Email</label>
                { errors.email && <span>{ errors.email }</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name='password' value={this.state.password} onChange={this.onChange} type="password" className="validate"/>
                <label htmlFor="password">Password</label>
                { errors.password && <span>{ errors.password }</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="confirm_password" name='confirmPassword' value={this.state.confirmPassword} onChange={this.onChange} type="password" className="validate"/>
                <label htmlFor="confirm_password">Confirm password</label>
                { errors.confirmPassword && <span>{ errors.confirmPassword }</span>}
              </div>
            </div>
            <button className="btn waves-effect waves-light" disabled={this.state.isLoading} type="submit" name="action">Submit</button>
            <div className="modal-footer">
              <a href="#!"></a>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

SignUpModal.propTypes = {
  userSignupRequest: PropTypes.func,
};

export default withRouter(SignUpModal);
