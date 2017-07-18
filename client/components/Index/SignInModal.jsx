import React from 'react';


export default class SignInModal extends React.Component {
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
