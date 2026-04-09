import React, { useState } from 'react';

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPunchline, setShowPunchline] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    setShowPunchline(false);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">😂</div>
        <h2 className="card-title">Joke Generator</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && joke && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <p style={{ 
              fontSize: '1.2rem', 
              fontWeight: '500', 
              marginBottom: '1.5rem',
              color: 'var(--color-text-primary)'
            }}>
              "{joke.setup}"
            </p>
            
            {showPunchline ? (
              <p className="animate-fade-in" style={{ 
                fontSize: '1.1rem', 
                color: 'var(--color-accent)',
                fontWeight: '600',
                padding: '1rem',
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '8px',
                border: '1px dashed var(--color-accent)'
              }}>
                {joke.punchline}
              </p>
            ) : (
              <button 
                className="btn-secondary" 
                onClick={() => setShowPunchline(true)}
                style={{ width: 'auto' }}
              >
                Reveal Punchline
              </button>
            )}
          </div>
        )}
        
        {!loading && !error && !joke && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Need a laugh? Click below!
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchJoke} disabled={loading}>
        {loading ? 'Fetching...' : joke ? 'Next Joke' : 'Get Joke'}
      </button>
    </div>
  );
};

export default JokeGenerator;
