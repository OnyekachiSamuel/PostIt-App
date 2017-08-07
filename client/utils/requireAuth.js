import React from 'react';


const requireAuth = (ComposedComponent) => {
  class Authenticate extends React.Component {
    render() {
      console.log(this.props, 'ooooo');
        return (
            <ComposedComponent {...this.props} />
        );
    }
}
  return Authenticate;
};


export default requireAuth;
