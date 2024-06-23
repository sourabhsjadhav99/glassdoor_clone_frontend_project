// When no page for any endpoint 
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className='text-center min-h-[90vh]'>
      <h1 className='text-3xl'>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
