import React from 'react';

/**
 * @class Footer
 */
export default class Footer extends React.Component {
  /**
   * @return {String} HTML markup for view component of Footer
   */
  render() {
    return (
      <footer>
        <div className="container center">
          <p>&copy; PostIt 2017</p>
        </div>
      </footer>
    );
  }
}
