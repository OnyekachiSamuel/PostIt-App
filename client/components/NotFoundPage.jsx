import React from 'react';
import { Link } from 'react-router-dom';

 /**
   * @return {String} HTML markup for NotFound page
   */
const NotFoundPage = () => {
  return (
    <div className="center notFound" style={{ margin: '0' }}>
      <div>
        <h1 style={{ marginTop: '230px' }}>Page Not Found</h1>
        <p>Sorry, there is nothing to see here.</p>
        <p><Link style={{ color: '#fff' }} to="/"><b>Back to Home</b></Link></p>
      </div>
    </div>
  );
};

export default NotFoundPage;
