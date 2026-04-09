import React, { useState } from 'react';

const CatFinder = () => {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchCat = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) throw new Error('Failed to fetch cat image');
      const data = await response.json();
      setCat(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    if (cat?.url) {
      navigator.clipboard.writeText(cat.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">🐱</div>
        <h2 className="card-title">Cat Finder</h2>
      </div>
      
      <div className="card-content" style={{ alignItems: 'center' }}>
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && cat && (
          <div className="animate-fade-in" style={{ width: '100%', textAlign: 'center' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              borderRadius: '12px', 
              overflow: 'hidden',
              marginBottom: '1rem',
              background: 'rgba(0,0,0,0.2)'
            }}>
              <img 
                src={cat.url} 
                alt="A cute cat" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Found a feline!
            </h3>
          </div>
        )}
        
        {!loading && !error && !cat && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Ready for some cat magic?
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button className="btn-primary" onClick={fetchCat} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Cat'}
        </button>
        {cat && (
          <button className="btn-secondary" onClick={copyUrl}>
            {copied ? '✅  Copied!' : '📋  Copy Image URL'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CatFinder;
