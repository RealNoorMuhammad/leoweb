import './Navbar.css'
import dexscreenerLogo from '../assets/dexscreener.png'

function XLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function Navbar() {
  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <a href="/" className="navbar-logo" aria-label="$LEO Home">
          <span className="navbar-logo-text">$LEO</span>
          <span className="navbar-logo-glow" aria-hidden />
        </a>
        <nav className="navbar-actions" aria-label="Social links">
          <a
            href="https://dexscreener.com/solana/dn37kcnvq7eic3e9ktwfpzjbyebpvhgmjuznybhjedjq"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-btn navbar-btn-dex"
            aria-label="DexScreener"
          >
            <img src={dexscreenerLogo} alt="" className="navbar-btn-img" />
          </a>
          <a
            href="https://x.com/i/communities/2023146752430559677"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-btn navbar-btn-x"
            aria-label="X (Twitter)"
          >
            <XLogoIcon />
          </a>
        </nav>
      </div>
      <div className="navbar-flame-bar" aria-hidden />
    </header>
  )
}
