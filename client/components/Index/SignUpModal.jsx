import React from 'react';


export default class SignUpModal extends React.Component {
  render() {
    return (
      <div className="row modal" id="modal1">
        <div className="modal-content">
          <h4>Sign Up</h4>
          <form className="col s12" method="post" action="#">
            <div className="row">
              <div className="input-field col s6">
                <input id="name" placeholder="" type="text" className="validate" required/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s6">
                <input id="user_name" placeholder="" type="text" className="validate" required/>
                <label htmlFor="user_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" placeholder="" type="email" className="validate" required/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" placeholder="" type="password" className="validate" required/>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="confirm_password" placeholder="" type="password" className="validate" required/>
                <label htmlFor="confirm_password">Confirm password</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
            <div className="modal-footer">
              <a href="#!" className=" btn modal-action modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

