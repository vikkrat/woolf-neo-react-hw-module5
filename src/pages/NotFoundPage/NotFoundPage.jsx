import React from 'react';

import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" style={{ color: '#e52b50', fontSize: '20px' }}>Go back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
