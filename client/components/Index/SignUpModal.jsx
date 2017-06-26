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
                <input id="name" placeholder="Name" type="text" className="validate" required/>
                <label htmlFor="name"></label>
              </div>
              <div className="input-field col s6">
                <input id="user_name" placeholder="Username" type="text" className="validate" required/>
                <label htmlFor="user_name"></label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" placeholder="Email" type="email" className="validate" required/>
                <label htmlFor="email"></label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" placeholder="Password" type="password" className="validate" required/>
                <label htmlFor="password"></label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="confirm_password" placeholder="Confirm password" type="password" className="validate" required/>
                <label htmlFor="confirm_password"></label>
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

