import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const requireAuth = (ComposedComponent) => {
  /**
   * @class
   */
  class Authenticate extends React.Component {
    /**
     * Checks if the user is authenticated
     * @return {null} This method returns nothing
     */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/');
      }
    }

  /**
   * Renders HTML markup for view component
   * @return {String} Returns html markup for view component
   *
   */
    render() {
      return (
            <ComposedComponent {...this.props} />
      );
    }
}
  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool
  };

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.signin.isAuthenticated
    };
  };
  return connect(mapStateToProps)(Authenticate);
};


export default requireAuth;
