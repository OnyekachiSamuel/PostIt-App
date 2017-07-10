import React from 'react';


export default class SignInModal extends React.Component {
  render() {
    return (
      <div className="row modal" id="modal2">
        <div className="modal-content">
          <h4>Sign In</h4>
          <form className="col s12" method="post" action="#">
            <div className="row">
              <div className="input-field col s12">
                <input id="username" placeholder="" type="text" className="validate" required/>
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" placeholder="" type="password" className="validate" required/>
                <label htmlFor="password">Password</label>
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
