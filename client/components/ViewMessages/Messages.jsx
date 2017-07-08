import React from 'react';

export default class Messages extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <ul className="collapsible" data-collapsible="accordion">
            <li>
              <div className="collapsible-header"><i className="material-icons">
                  explore</i>Andela 21 Group</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">explore</i>
              Bootcamp Group</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">
                  explore</i>AndelaNairaland Group</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
