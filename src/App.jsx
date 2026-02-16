import { useState } from 'react'
import './App.css'

function App() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="app">
      {/* Ambient background */}
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />

      <header className="header">
        <a href="/" className="logo">
          <span className="logo-mark">LEO</span>
        </a>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <p className="hero-badge">React + Vite — ready to build</p>
          <h1 className="hero-title">
            Build something
            <span className="hero-title-accent"> amazing</span>
          </h1>
          <p className="hero-desc">
            Your LEO web project is live. Edit <code>src/App.jsx</code> and save —
            changes appear instantly. Start building your idea.
          </p>
          <div className="hero-actions">
            <a
              href="#start"
              className="btn btn-primary"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Get started
              <span className="btn-arrow">{hovered ? '→' : '→'}</span>
            </a>
            <a href="#docs" className="btn btn-ghost">
              Read the docs
            </a>
          </div>
        </section>

        <section className="cards" id="about">
          <article className="card">
            <span className="card-icon">⚡</span>
            <h3>Fast</h3>
            <p>Vite powers instant HMR and lightning builds so you stay in flow.</p>
          </article>
          <article className="card">
            <span className="card-icon">◆</span>
            <h3>Simple</h3>
            <p>React + JS. No extra config — just write components and ship.</p>
          </article>
          <article className="card">
            <span className="card-icon">◇</span>
            <h3>Yours</h3>
            <p>This stack is your canvas. Design and build the experience you want.</p>
          </article>
        </section>
      </main>

      <footer className="footer">
        <p>LEO Web · React + Vite</p>
      </footer>
    </div>
  )
}

export default App
