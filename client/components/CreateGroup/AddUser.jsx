import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default class AddUser extends React.Component {
  render() {
    return (
      <div className="row add">
        <div className="card-panel z-depth-2 col s6 m6 l6">
          <h4 className="center">Groups</h4>
          <hr/>
          <div className="collection">
            <div>
              <Link to="#" className="collection-item">HTML 5</Link>
            </div>
            <div>
              <Link to="#!" className="collection-item ">JQuery</Link>
            </div>
          </div>
        </div>
        <div className="card-panel z-depth-2 col s6 m6 l6 member">
          <h4>Add Members </h4>
          <hr/>
          <div className="member">
            <h5>Indian Man</h5>
            <button className="btn waves-effect waves-teal">Add</button>
          </div>
          <div className="member">
            <h5>Kachi</h5>
            <button className="btn waves-effect waves-teal">Add</button>
          </div>
        </div>
      </div>
    );
  }
}









