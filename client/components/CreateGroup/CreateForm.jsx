import React from 'react';

/**
 * @class
 */
export default class CreateForm extends React.Component {
  /**
   * @return {String} HTML markup for view component of CreateForm
   */
  render() {
    return (
      <div className="row gp-form">
        <form className="col s12 m12" method="post" action="#">
          <div className="row">
            <div className="input-field col s6">
              <input placeholder="Group Name" type="text" className="validate" required/>
            </div>
            <div className="input-field col s6">
              <input placeholder="Group Category" type="text" className="validate"/>
            </div>
            <button className="btn waves-effect waves-light col s12" type="submit" name="action">
                Create Group <i className="material-icons right"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

