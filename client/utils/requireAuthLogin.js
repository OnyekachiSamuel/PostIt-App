import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const requireAuthLogin = (ComposedComponent) => {
  class Authenticate extends React.Component {
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.props.history.push('/group');
      }
    }
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


export default requireAuthLogin;
