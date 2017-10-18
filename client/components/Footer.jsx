import React from 'react';

/**
 * @class Footer
 */
export default class Footer extends React.Component {
  /**
   * Renders HTML markup for view component of Footer
   * @return {String} Returns html markup
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
