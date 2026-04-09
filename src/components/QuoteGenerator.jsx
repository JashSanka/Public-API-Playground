import React, { useState } from 'react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Current stability check for quotable.io
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) throw new Error('Quotable API unavailable');
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      // Fallback to Advice Slip if Quotable is down
      try {
        const fallback = await fetch('https://api.adviceslip.com/advice');
        const data = await fallback.json();
        setQuote({ content: data.slip.advice, author: 'Advice Slip' });
      } catch (fallbackErr) {
        setError('Both primary and secondary APIs are currently unreachable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <div className="card-icon">💬</div>
        <h2 className="card-title">Quote Generator</h2>
      </div>

      <div className="card-content">
        {loading && <div className="loader"></div>}
        
        {error && <div className="error-text">{error}</div>}
        
        {!loading && !error && quote && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <p style={{ 
              fontSize: '1.1rem', 
              fontStyle: 'italic',
              fontWeight: '500', 
              lineHeight: '1.6',
              marginBottom: '1rem',
              color: 'var(--color-text-primary)'
            }}>
              "{quote.content}"
            </p>
            <p style={{ 
              fontSize: '0.9rem', 
              color: 'var(--color-accent)',
              fontWeight: '600'
            }}>
              — {quote.author}
            </p>
          </div>
        )}
        
        {!loading && !error && !quote && (
          <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Get inspired with a random quote.
          </p>
        )}
      </div>

      <button className="btn-primary" onClick={fetchQuote} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Quote'}
      </button>
    </div>
  );
};

export default QuoteGenerator;
