import React from 'react';


export default class SignUpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }
  onHandle(e) {

  }
  onChange(e) {
    let state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  render() {
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
              <div className="input-field col s6">
                <input id="name" name='name' value={this.state.name}
                type="text" onChange={this.onChange} className="validate" required/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s6">
                <input id="user_name" name="username" value={this.state.username} onChange={this.onChange} type="text" className="validate" required/>
                <label htmlFor="user_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" name="email" value={this.state.email} onChange={this.onChange} type="email" className="validate" required/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" name='password' value={this.state.password} onChange={this.onChange} type="password" className="validate" required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="confirm_password" name='confirmPassword' value={this.state.confirmPassword} onChange={this.onChange} type="password" className="validate" required/>
                <label htmlFor="confirm_password">Confirm password</label>
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

