import { Link } from 'react-router-dom'
import { FiInstagram, FiYoutube, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaPinterestP } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h3>Stay in the Loop</h3>
            <p>Subscribe for exclusive offers, new arrivals & styling tips</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <div className="footer-logo">
                <span className="logo-text">Uditas</span>
                <span className="logo-sub">Creations</span>
              </div>
              <p className="footer-desc">
                Handcrafted jewelry that tells your story. Each piece is designed with love, blending traditional artistry with contemporary elegance.
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FiInstagram /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><FaPinterestP /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FiYoutube /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/shop">Shop All</Link></li>
                <li><Link to="/collections">Collections</Link></li>
                <li><Link to="/shop/earrings">Earrings</Link></li>
                <li><Link to="/shop/necklaces">Necklaces</Link></li>
                <li><Link to="/shop/bracelets">Bracelets</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Customer Care</h4>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/track-order">Track Order</Link></li>
                <li><Link to="/policies/shipping">Shipping Policy</Link></li>
                <li><Link to="/policies/returns">Returns & Exchange</Link></li>
                <li><Link to="/policies/privacy">Privacy Policy</Link></li>
                <li><Link to="/policies/terms">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Get in Touch</h4>
              <ul className="footer-contact">
                <li><FiMail /> <a href="mailto:hello@uditascreations.com">hello@uditascreations.com</a></li>
                <li><FiPhone /> <a href="tel:+919876543210">+91 98765 43210</a></li>
                <li><FiMapPin /> <span>Mumbai, Maharashtra, India</span></li>
              </ul>
              <div className="footer-payment-info">
                <h5>We Accept</h5>
                <div className="payment-icons">
                  <span className="payment-badge">UPI</span>
                  <span className="payment-badge">Cards</span>
                  <span className="payment-badge">Net Banking</span>
                  <span className="payment-badge">COD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Uditas Creations. All rights reserved.</p>
          <p className="footer-credit">Crafted with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
