import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class Title
 */
export default class Title extends React.Component {
  /**
   * @return {String} HTML markup for view component of Title
   */
  render() {
    return (
      <div>
      <div className="heading">
        <div className="left">
        </div>
        <div className="right">
                <Link className="waves-effect waves-light btn" to="#modal4">View members</Link>
        </div>
      </div>
      </div>
    );
  }
}
