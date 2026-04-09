import React, { useState } from 'react';

const DogFinder = () => {
  const [dog, setDog] = useState({ image: null, breed: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchDog = async () => {
    setLoading(true);
    setError(null);
    setCopied(false);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) throw new Error('Failed to fetch dog image');
      const data = await response.json();
      
      // Parse breed from URL: https://images.dog.ceo/breeds/hound-english/n02089973_1.jpg
      const urlParts = data.message.split('/');
      let breedName = urlParts[4] || 'Unknown Breed';
      breedName = breedName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      setDog({ image: data.message, breed: breedName });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    if (dog.image) {
      navigator.clipboard.writeText(dog.image);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">🐶</div>
        <h2 className="card-title">Dog Finder</h2>
      </div>
      
      <div className="card-content" style={{ alignItems: 'center' }}>
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && dog.image && (
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
                src={dog.image} 
                alt={dog.breed} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              {dog.breed}
            </h3>
          </div>
        )}
        
        {!loading && !error && !dog.image && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Ready to find a random dog?
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button className="btn-primary" onClick={fetchDog} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Dog'}
        </button>
        {dog.image && (
          <button className="btn-secondary" onClick={copyUrl}>
            {copied ? '✅  Copied!' : '📋  Copy Image URL'}
          </button>
        )}
      </div>
    </div>
  );
};

export default DogFinder;
