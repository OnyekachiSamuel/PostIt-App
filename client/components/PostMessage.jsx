import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar.jsx';
import WhiteBar from '../components/WhiteBar.jsx';
import ComposeMessage from './PostMessage/ComposeMessage.jsx';
import PostedMessage from './PostMessage/PostedMessage.jsx';
import ViewMembers from './PostMessage/ViewMembersModal.jsx';


/**
 * @class BroadcastMessage
 */
class BroadcastMessage extends React.Component {
  /**
   *
   * @param {obj} props
   * @return {null} Initializes the state and binds methods
   */
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.show = this.show.bind(this);
  }
  /**
   * @return {null} makes the jQuery function available on component mount
   */
  componentDidMount() {
    $('.collapsible').collapsible();
    $('select').material_select();
    $('.modal').modal();
  }
  /**
     * @return {null} navigates to the landing page
     */
  signOut() {
    this.props.history.push('/');
  }

/**
 * @return {null} Function used to show navigation icon
 *  for navigating the webpages
 */
  show() {
    return true;
  }
    /**
   * @return {String} HTML markup for view component of PostMessage
   */
  render() {
    const { groupInfo } = this.props;
    return (
      <div>
        <NavBar signOut={this.signOut} show={this.show}
        redirectUrl={'/group'} />
        <WhiteBar />
        <div className="card center green-text group-name">{`${groupInfo.groupName} Group`}</div>
        <div className="container-fluid">
          <div className="row">
            <div className="col m5 s12">
              <ViewMembers />
              <ComposeMessage />
            </div>
            <div className="col m7 s12">
              <PostedMessage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  const { groupInfo } = state;
  return {
    groupInfo
  };
};
export default connect(mapStateToProps)(withRouter(BroadcastMessage));
