import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './CreateGroup/NavBar.jsx';
import Title from './CreateGroup/Title.jsx';
import CreateForm from './CreateGroup/CreateForm.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Title/>
          <CreateForm/>
        </div>
      </div>
    );
  }
}
