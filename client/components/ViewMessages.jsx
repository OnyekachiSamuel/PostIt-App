import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NavBar from '../components//NavBar.jsx';
import WhiteBar from '../components/WhiteBar.jsx';
import SelectGroup from './ViewMessages/SelectGroup.jsx';


/**
 * @class ViewMessages
 */
class ViewMessages extends React.Component {
  /**
     * @return {null} makes the jQuery function available on component mount
     */
  componentDidMount() {
    $('.collapsible').collapsible();
    $('.modal').modal();
  }
  /**
   * @return {null} navigates to the landing page
   */
  signOut() {
    this.props.history.push('/');
  }
  /**
   * @return {String} HTML markup for view component of ViewMessages
   */
  render() {
    const { groupInfo } = this.props;
    return (
      <div>
        <NavBar signOut={this.signOut.bind(this)} redirectUrl = {`/${groupInfo.groupId}/${groupInfo.groupName}/post`} />
          <WhiteBar />
          <SelectGroup />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { groupInfo } = state;
  return {
    groupInfo
  };
};

export default connect(mapStateToProps, {})(withRouter(ViewMessages));
