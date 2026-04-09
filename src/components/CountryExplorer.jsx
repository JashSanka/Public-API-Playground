import React, { useState } from 'react';

const CountryExplorer = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountry = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();
      
      // Select a random country from the list
      const randomIndex = Math.floor(Math.random() * data.length);
      setCountry(data[randomIndex]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">🌍</div>
        <h2 className="card-title">Country Explorer</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && country && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
              {country.flag}
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              {country.name.common}
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', textAlign: 'left', padding: '0 1rem' }}>
              <p>🏛 **Capital:** {country.capital?.[0] || 'N/A'}</p>
              <p>👥 **Population:** {country.population.toLocaleString()}</p>
              <p>📍 **Region:** {country.region}</p>
              <p>🌏 **Subregion:** {country.subregion || 'N/A'}</p>
            </div>
          </div>
        )}
        
        {!loading && !error && !country && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Discover a random country.
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchCountry} disabled={loading}>
        {loading ? 'Exploring...' : 'Pick Random Country'}
      </button>
    </div>
  );
};

export default CountryExplorer;
