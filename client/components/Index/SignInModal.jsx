import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';


class SignInModal extends React.Component {
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
  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    this.props.signinRequest(this.state);
    // this.props.loginSuccess();
  //   .then((res) => {
  //     console.log(res);
  //     if (res.data.status === 'success') {
  //       localStorage.setItem('token', res.data.token);
  //       this.props.loginSuccess();
  //     } else if (res.data.status === 'failed') {
  //       Materialize.toast(res.data.message, 2000, 'green');
  //     } else if (res.data.errors) {
  //       this.setState({ errors: res.data.errors });
  //     }
  //   });
  // }
  }
  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  render() {
    return (
      <div className="row modal" id="modal2">
        <div className="modal-content">
          <div className="modal-title row">
        <div className="col s6 m6">
           <h4>Sign in</h4>
        </div>
       <div className="close-modal">
           <a href="#" className="modal-close">Close</a>
       </div>
       </div>
          <form className="col s12" method="post" onSubmit= { this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="username" name="username" value={ this.state.username } onChange={this.onChange} type="text" className="validate" required/>
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name="password" value={this.state.password} onChange={this.onChange} type="password" className="validate" required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
            <div className="modal-footer">
              <a href="#!"></a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignInModal.propTypes = {
  userSigninRequest: PropTypes.func,
};
export default withRouter(SignInModal);
