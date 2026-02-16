import { useState, useCallback, useRef } from 'react'
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

// Direct video URLs from Cloudinary
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@leothehomelesstort'
const TIKTOK_VIDEOS = [
  'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771233999/ssstik.io__leothehomelesstort_1771233947291_o6un2m.mp4',
  'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771234129/ssstik.io__leothehomelesstort_1771233885301_ehspr5.mp4',
  'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771234142/ssstik.io__leothehomelesstort_1771233920559_jfyxlf.mp4',
  'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771234150/ssstik.io__leothehomelesstort_1771233901808_ycl0a6.mp4',
  'https://res.cloudinary.com/dvp5f8zbt/video/upload/v1771234155/ssstik.io_1771233849640_plywtv.mp4',
]

const CONTRACT_ADDRESS = 'J2PTfUwVMFYxJsEkgcbzazyX4aLbVgZzDBBU1WcFpump'
const DEXSCREENER_EMBED_URL =
  'https://dexscreener.com/solana/dn37kcnvq7eic3e9ktwfpzjbyebpvhgmjuznybhjedjq?embed=1&chartTheme=dark&theme=dark&chartLeftToolbar=0&loadChartSettings=0'

function App() {
  const [toastVisible, setToastVisible] = useState(false)
  const [chartLoaded, setChartLoaded] = useState(false)
  const [copied, setCopied] = useState(false)
  const tiktokScrollRef = useRef(null)

  const scrollTiktok = useCallback((direction) => {
    const el = tiktokScrollRef.current
    if (!el) return
    const step = Math.min(380, el.offsetWidth * 0.95)
    el.scrollBy({ left: direction === 'next' ? step : -step, behavior: 'smooth' })
  }, [])


  const copyAddress = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTRACT_ADDRESS)
        setCopied(true)
        setToastVisible(true)
        setTimeout(() => {
          setToastVisible(false)
          setCopied(false)
        }, 3000)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = CONTRACT_ADDRESS
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        try {
          const successful = document.execCommand('copy')
          if (successful) {
            setCopied(true)
            setToastVisible(true)
            setTimeout(() => {
              setToastVisible(false)
              setCopied(false)
            }, 3000)
          } else {
            throw new Error('Copy command failed')
          }
        } catch (err) {
          console.error('Failed to copy:', err)
          // Still show toast even if copy fails
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
          }, 3000)
          alert('Failed to copy address. Please copy manually: ' + CONTRACT_ADDRESS)
        } finally {
          document.body.removeChild(textArea)
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      // Fallback: try the old method
      try {
        const textArea = document.createElement('textarea')
        textArea.value = CONTRACT_ADDRESS
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        textArea.style.top = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (successful) {
          setCopied(true)
          setToastVisible(true)
          setTimeout(() => {
            setToastVisible(false)
            setCopied(false)
          }, 3000)
        } else {
          throw new Error('Fallback copy failed')
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
        // Show toast anyway
        setToastVisible(true)
        setTimeout(() => {
          setToastVisible(false)
        }, 3000)
        alert('Failed to copy address. Please copy manually: ' + CONTRACT_ADDRESS)
      }
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
          {/* Floating particles background */}
          <div className="hero-particles" aria-hidden="true">
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
          </div>
          
          <div className="hero-container">
            {/* Left Side - Text Content */}
            <div className="hero-left">
              <div className="hero-content">
                <p className="hero-badge">
                  <span className="hero-badge-icon">🔥</span>
                  $LEO Token
                </p>
                <h1 className="hero-leo" aria-hidden="true">
                  <span className="hero-leo-dollar">$</span>
                  <span className="hero-leo-text">LEO</span>
                </h1>
                <p className="hero-subtitle">The Legendary Tortoise</p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hero-right">
              <div className="hero-image-wrapper">
                <div className="hero-image-border"></div>
                <img
                  src={g4}
                  alt="Leo the tortoise"
                  className="hero-image"
                  loading="eager"
                  decoding="async"
                />
                <div className="hero-image-overlay" aria-hidden="true" />
                <div className="hero-image-glow" aria-hidden="true" />
                <div className="hero-image-shine" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* CA — Contract Address Section (Separate) */}
        <section className="contract-address-section">
          <div className="contract-address-container">
            <span className="contract-address-label">CA — Contract Address</span>
            <div className="contract-address-box">
              <code className="contract-address-text">{CONTRACT_ADDRESS}</code>
              <button
                type="button"
                className={`btn btn-copy ${copied ? 'btn-copy--copied' : ''}`}
                onClick={copyAddress}
                onMouseDown={(e) => e.preventDefault()}
                aria-label="Copy contract address"
                tabIndex={0}
              >
                {copied ? (
                  <>
                    <span className="btn-copy-icon">✓</span>
                    Copied!
                  </>
                ) : (
                  'Copy Address'
                )}
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
          <p className="tiktok-slider-profile">
            From{' '}
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-slider-profile-link"
            >
              @leothehomelesstort
            </a>
            {' '}on TikTok
          </p>
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
                  <video
                    className="tiktok-video"
                    src={url}
                    controls
                    playsInline
                    preload="metadata"
                    style={{ maxWidth: '605px', minWidth: '325px' }}
                  >
                    Your browser does not support the video tag.
                  </video>
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
        <span className="toast-message">Address copied!</span>
      </div>
    </div>
  )
}

export default App
