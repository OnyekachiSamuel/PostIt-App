import React from 'react';

export default class Title extends React.Component {
  render() {
    return(
      <div>
        <div className="card-panel center">
          <h4>POST IT, SHARE IT</h4>
        </div>
        <hr/>
        <br/>
        <div className="card-panel center message">
          <h4>Compose message</h4>
        </div>
      </div>
    );
  }
}
