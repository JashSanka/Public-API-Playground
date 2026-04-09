import React from 'react';
import './App.css';
import DogFinder from './components/DogFinder';
import CatFinder from './components/CatFinder';
import RandomUserProfile from './components/RandomUserProfile';
import JsonPlaceholderDemo from './components/JsonPlaceholderDemo';
import QuoteGenerator from './components/QuoteGenerator';
import CatFacts from './components/CatFacts';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title text-gradient">Public API Playground</h1>
        <p className="app-subtitle">
          Explore and test various public APIs in one cohesive, premium interface.
          From random pets and quotes to fascinating facts and user profiles.
        </p>
      </header>

      <main className="api-grid">
        <DogFinder />
        <CatFinder />
        <CatFacts />
        <QuoteGenerator />
        <RandomUserProfile />
        <JsonPlaceholderDemo />
      </main>

      <footer style={{ 
        marginTop: '4rem', 
        padding: '2rem 0', 
        textAlign: 'center', 
        color: 'var(--color-text-secondary)',
        borderTop: '1px solid var(--color-border)',
        fontSize: '0.9rem'
      }}>
        Built with ❤️ for the Public API Playground Task
      </footer>
    </div>
  );
}

export default App;
