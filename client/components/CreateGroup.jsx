import React from 'react';
import NavBar from './CreateGroup/NavLink.jsx';
import Title from './CreateGroup/TitleHeader.jsx';
import AddUser from './CreateGroup/AddUser.jsx';
import SelectGroup from './CreateGroup/SelectGroup.jsx';
import GroupModal from './CreateGroup/GroupModal.jsx';
import Footer from './Footer.jsx';

class CreateGroup extends React.Component {
  componentDidMount() {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      inDuration: 300,
      outDuration: 200,
      startingTop: '4%',
      endingTop: '10%',
      ready: function (modal, trigger) {
        console.log(modal, trigger);
      },
      complete: function () { }
    }
  );
  }
   render() {
    return (
      <div>
        <NavBar/>
        <Title/>
        <AddUser/>
        <GroupModal/>
        <SelectGroup/>
        <Footer/>
      </div>
    );
  }
}

export default CreateGroup;
