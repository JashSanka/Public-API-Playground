import React, { useState } from 'react';

const CatFacts = () => {
  const [fact, setFact] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFact = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) throw new Error('Failed to fetch cat fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">💡</div>
        <h2 className="card-title">Cat Facts</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && fact && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <p style={{ 
              fontSize: '1.1rem', 
              fontWeight: '500', 
              lineHeight: '1.6',
              color: 'var(--color-text-primary)'
            }}>
              "{fact}"
            </p>
          </div>
        )}
        
        {!loading && !error && !fact && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Did you know? Click the button to learn a random cat fact!
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchFact} disabled={loading}>
        {loading ? 'Learning...' : 'Get Cat Fact'}
      </button>
    </div>
  );
};

export default CatFacts;
