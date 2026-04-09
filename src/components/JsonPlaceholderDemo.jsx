import React, { useState } from 'react';

const JsonPlaceholderDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching a random post between 1 and 100
      const postId = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">📝</div>
        <h2 className="card-title">JSON Explorer</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && data && (
          <div className="animate-fade-in">
            <h3 style={{ 
              fontSize: '1.1rem', 
              color: 'var(--color-accent)', 
              marginBottom: '0.75rem',
              textTransform: 'capitalize'
            }}>
              {data.title}
            </h3>
            <p style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              {data.body}
            </p>
            <div style={{ 
              padding: '0.5rem', 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#10b981'
            }}>
              Post ID: {data.id} | User ID: {data.userId}
            </div>
          </div>
        )}
        
        {!loading && !error && !data && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Fetch placeholder posts and comments.
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchData} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Random Post'}
      </button>
    </div>
  );
};

export default JsonPlaceholderDemo;
