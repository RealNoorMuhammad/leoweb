import { useState, useCallback, useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import loreImage from './assets/lore.jpg'
// Gallery images
import g1 from './assets/g1.jpg'
import g2 from './assets/g2.jpg'
import g3 from './assets/g3.jpg'
import g4 from './assets/g4.jpg'
import g5 from './assets/g5.jpg'
import './App.css'

const GALLERY_IMAGES = [g1, g2, g3, g4, g5]

const TIKTOK_VIDEOS = [
  'https://vt.tiktok.com/ZSmB83j5c/',
  'https://vt.tiktok.com/ZSmB8orkU/',
  'https://vt.tiktok.com/ZSmBL8uqG/',
  'https://vt.tiktok.com/ZSmB8phHd/',
  'https://vt.tiktok.com/ZSmBLLxj7/',
  'https://vt.tiktok.com/ZSmBLLtLj/',
  'https://vt.tiktok.com/ZSmBL1NRx/',
  'https://vt.tiktok.com/ZSmB8ocC7/',
]

const CONTRACT_ADDRESS = 'J2PTfUwVMFYxJsEkgcbzazyX4aLbVgZzDBBU1WcFpump'
const DEXSCREENER_EMBED_URL =
  'https://dexscreener.com/solana/dn37kcnvq7eic3e9ktwfpzjbyebpvhgmjuznybhjedjq?embed=1&chartTheme=dark&theme=dark&chartLeftToolbar=0&loadChartSettings=0'

function App() {
  const [toastVisible, setToastVisible] = useState(false)
  const [chartLoaded, setChartLoaded] = useState(false)
  const tiktokScrollRef = useRef(null)

  const scrollTiktok = useCallback((direction) => {
    const el = tiktokScrollRef.current
    if (!el) return
    const step = Math.min(380, el.offsetWidth * 0.95)
    el.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    // Load TikTok embed script
    if (typeof document === 'undefined') return
    
    const id = 'tiktok-embed-script'
    if (document.getElementById(id)) {
      // Script already loaded, trigger re-render of embeds
      setTimeout(() => {
        if (window.tiktokEmbed && window.tiktokEmbed.lib) {
          window.tiktokEmbed.lib.renderAll()
        }
      }, 100)
      return
    }
    
    const script = document.createElement('script')
    script.id = id
    script.async = true
    script.src = 'https://www.tiktok.com/embed.js'
    script.onload = () => {
      // Ensure embeds are rendered after script loads
      setTimeout(() => {
        if (window.tiktokEmbed && window.tiktokEmbed.lib) {
          window.tiktokEmbed.lib.renderAll()
        }
      }, 500)
    }
    document.body.appendChild(script)
    
    // Also trigger render when slider comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.tiktokEmbed && window.tiktokEmbed.lib) {
            setTimeout(() => {
              window.tiktokEmbed.lib.renderAll()
            }, 300)
          }
        })
      },
      { threshold: 0.1 }
    )
    
    const sliderElement = document.querySelector('.tiktok-slider')
    if (sliderElement) {
      observer.observe(sliderElement)
    }
    
    return () => {
      if (sliderElement) {
        observer.unobserve(sliderElement)
      }
    }
  }, [])

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    } finally {
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3000)
    }
  }, [])

  const fireVideoUrl =
    'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771231078/Fire_Background_Slow_motion_Fire_Particles_Motion_Background_For_Edits_No_Copyright_Backgrounds_vqck3i.mp4'

  return (
    <div className="app">
      {/* Fire video background — full viewport, responsive */}
      <div className="video-background" aria-hidden="true">
        <video
          className="video-background__video"
          src={fireVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="video-background__overlay" aria-hidden="true" />
      </div>
      {/* Ambient background */}
      <div className="bg-mesh" aria-hidden="true" />
      <div className="bg-glow bg-glow-1" aria-hidden="true" />
      <div className="bg-glow bg-glow-2" aria-hidden="true" />

      <Navbar />

      <main className="main">
        <section className="hero">
          <p className="hero-badge">$LEO Token</p>
          <h1 className="hero-leo" aria-hidden="true">
            <span className="hero-leo-dollar">$</span>
            <span className="hero-leo-text">LEO</span>
          </h1>
          <p className="hero-desc">
            The next evolution. Built on Solana. Community-first, transparent, and here to stay.
          </p>

          {/* CA — Contract Address */}
          <div className="hero-ca">
            <span className="hero-ca-label">CA — Contract Address</span>
            <div className="hero-ca-box">
              <code className="hero-ca-address">{CONTRACT_ADDRESS}</code>
              <button
                type="button"
                className="btn btn-copy"
                onClick={copyAddress}
                aria-label="Copy contract address"
              >
                Copy Address
              </button>
            </div>
          </div>
        </section>

        <section className="lore" id="lore">
          <h2 className="lore-heading">Lore</h2>
          <div className="lore-inner">
            <div className="lore-media">
              <img
                src={loreImage}
                alt="Leo, the tortoise from Fullerton"
                className="lore-image"
                loading="lazy"
                decoding="async"
              />
              <div className="lore-image-shine" aria-hidden="true" />
            </div>
            <div className="lore-content">
              <p className="lore-text">
                Leo, a female pet tortoise from Fullerton, CA, escaped when a heat lamp tipped over, ignited her enclosure, and burned down the shed.
              </p>
            </div>
          </div>
        </section>

        <section className="tiktok-slider" id="videos">
          <h2 className="tiktok-slider-heading">Videos</h2>
          <div className="tiktok-slider-wrap">
            <button
              type="button"
              className="tiktok-slider-btn tiktok-slider-btn--prev"
              onClick={() => scrollTiktok('prev')}
              aria-label="Previous video"
            >
              ‹
            </button>
            <div className="tiktok-slider-track" ref={tiktokScrollRef}>
              {TIKTOK_VIDEOS.map((url, i) => (
                <div key={i} className="tiktok-slider-slide">
                  <blockquote
                    className="tiktok-embed"
                    cite={url}
                    data-video-id={url}
                    style={{ maxWidth: '605px', minWidth: '325px' }}
                  >
                    <section>
                      <a target="_blank" rel="noopener noreferrer" href={url}>
                        View on TikTok
                      </a>
                    </section>
                  </blockquote>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="tiktok-slider-btn tiktok-slider-btn--next"
              onClick={() => scrollTiktok('next')}
              aria-label="Next video"
            >
              ›
            </button>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <h2 className="gallery-heading">Gallery</h2>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-item-inner">
                  <img
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    className="gallery-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="gallery-fire-overlay" aria-hidden="true" />
                  <div className="gallery-glow" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dexscreener-section" id="chart">
          <h2 className="dexscreener-heading">Live Chart</h2>
          <p className="dexscreener-desc">LEO / SOL on DexScreener — House of Leo</p>
          <div className="dexscreener-wrap">
            <div className="dexscreener-frame-wrap">
              {!chartLoaded && (
                <div className="dexscreener-loading" aria-hidden="true">
                  <div className="dexscreener-loading-spinner" />
                  <span className="dexscreener-loading-text">Loading chart…</span>
                </div>
              )}
              <iframe
                src={DEXSCREENER_EMBED_URL}
                className={`dexscreener-iframe ${chartLoaded ? 'dexscreener-iframe--loaded' : ''}`}
                title="LEO SOL pair on DexScreener"
                onLoad={() => setChartLoaded(true)}
              />
              <div className="dexscreener-glow" aria-hidden="true" />
            </div>
            <a
              href="https://dexscreener.com/solana/dn37kcnvq7eic3e9ktwfpzjbyebpvhgmjuznybhjedjq"
              target="_blank"
              rel="noopener noreferrer"
              className="dexscreener-link"
            >
              Open in DexScreener →
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast — slides in from right */}
      <div
        className={`toast ${toastVisible ? 'toast--visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-hidden={!toastVisible}
      >
        <span className="toast-icon">✓</span>
        Address copied
      </div>
    </div>
  )
}

export default App
