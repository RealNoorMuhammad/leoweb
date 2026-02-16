import './Footer.css'
import dexscreenerLogo from '../assets/dexscreener.png'
import footerBg from '../assets/footer.jpg'

function XLogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const DEXSCREENER_URL = 'https://dexscreener.com/solana/dn37kcnvq7eic3e9ktwfpzjbyebpvhgmjuznybhjedjq'
const X_COMMUNITY_URL = 'https://x.com/i/communities/2023146752430559677'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer-overlay" aria-hidden />
      <div className="footer-flame-top" aria-hidden />
      <div className="footer-inner">
        <a href="/" className="footer-logo" aria-label="$LEO Home">
          <span className="footer-logo-text">$LEO</span>
        </a>
        <p className="footer-tagline">House of Leo</p>
        <nav className="footer-links" aria-label="Community links">
          <a
            href={DEXSCREENER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-dex"
          >
            <img src={dexscreenerLogo} alt="" className="footer-link-icon" />
            <span>DexScreener</span>
          </a>
          <a
            href={X_COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-x"
          >
            <XLogoIcon />
            <span>X Community</span>
          </a>
        </nav>
        <p className="footer-copy">© House of Leo. All rights reserved.</p>
      </div>
      <div className="footer-flame-bar" aria-hidden />
    </footer>
  )
}
