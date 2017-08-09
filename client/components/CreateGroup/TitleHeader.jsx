import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Title extends Component {
  render() {
    return (
           <div>
            <div className="heading">
                <div className="left">
                </div>
                <div className="right">
                    <Link className="waves-effect waves-light btn" to="#modal3">Create group</Link>
                </div>
            </div>
            </div>
    );
  }
}
