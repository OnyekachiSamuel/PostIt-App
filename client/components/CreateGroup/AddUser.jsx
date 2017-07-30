import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.onClickEvent = this.onClickEvent.bind(this);
    }
    onClickEvent(e) {
        console.log('I was clicked', this);
    }
    render() {
        return (
            <div className="container search">
                <form id="search-site" action='search' method='get'>
                    <select className="browser-default">
                  <option value="" disabled selected>Select Group</option>
                  <option value="1" ref= "group">Mango</option>
                  <option value="2">Orange</option>
                  <option value="3">Apple</option>
               </select>
                    <div className="input-group">
                        <div className="input-field">
                            <input id="search" placeholder="Search users" onClick={ this.onClickEvent } type="search" name='q'/>
                            <label className="label-icon" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>
                        </div>
                        <button type="submit" className="input-group-addon btn">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}
