import React, { useState } from 'react';

const RandomUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) throw new Error('Failed to fetch user');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">👤</div>
        <h2 className="card-title">Random User</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && user && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <img 
              src={user.picture.large} 
              alt={user.name.first} 
              style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                border: '3px solid var(--color-accent)',
                marginBottom: '1rem'
              }} 
            />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
              {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </h3>
            <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {user.email}
            </p>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <p>📍 {user.location.country}</p>
              <p>🎂 {user.dob.age} years old</p>
              <p>📞 {user.phone}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && !user && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Generate a random profile.
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchUser} disabled={loading}>
        {loading ? 'Generating...' : 'Get User'}
      </button>
    </div>
  );
};

export default RandomUserProfile;
