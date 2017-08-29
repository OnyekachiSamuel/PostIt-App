import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { archiveMessageRequest } from '../../actions/archiveMessage';

export default class ArchiveModal extends Component {
  render() {
    return (
        <div id="modal6" className="modal">
    <div className="modal-content">
      <h4 style={{ backgroundColor: '#3e7293', color: '#fff' }} className="center"> Sure of what you are doing ?</h4>
      <p>Click on archive button if you want to proceed with this action</p>
    </div>
    <div className="modal-footer">
      <Link to="#!" className="modal-action modal-close count archive-btn btn" onClick={}>Archive</Link>
      <Link to="#!" className="modal-action modal-close count  btn blue-grey lighten-3">Cancel</Link>
    </div>
  </div>
    );
  }
}
