import React from 'react';
import NavBar from './CreateGroup/NavBar.jsx';
import Title from './CreateGroup/Title.jsx';
import CreateForm from './CreateGroup/CreateForm.jsx';
import AddUser from './CreateGroup/AddUser.jsx';
import Footer from './Footer.jsx';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <div className="container">
          <Title/>
          <CreateForm/>
          <AddUser/>
          <Footer/>
        </div>
      </div>
    );
  }
}