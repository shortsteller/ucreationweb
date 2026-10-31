import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/products'
import SearchModal from '../Common/SearchModal'
import './Header.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { cartCount } = useCart()
  const { wishlistItems } = useWishlist()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className="header-logo">
            <span className="logo-text">Uditas</span>
            <span className="logo-sub">Creations</span>
          </Link>

          <nav className={`header-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <div className="nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="nav-content">
              <div className="nav-header-mobile">
                <Link to="/" className="header-logo" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="logo-text">Uditas</span>
                  <span className="logo-sub">Creations</span>
                </Link>
                <button className="nav-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                  <FiX />
                </button>
              </div>

              <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>

              <div
                className="nav-dropdown"
                onMouseEnter={() => setActiveDropdown('shop')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/shop" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                  Shop <FiChevronDown className="dropdown-icon" />
                </Link>
                {activeDropdown === 'shop' && (
                  <div className="dropdown-menu mega-menu">
                    <div className="mega-menu-grid">
                      {categories.slice(0, 6).map(cat => (
                        <div key={cat.id} className="mega-menu-col">
                          <Link
                            to={`/shop/${cat.id}`}
                            className="mega-menu-title"
                            onClick={() => { setActiveDropdown(null); setIsMobileMenuOpen(false) }}
                          >
                            {cat.icon} {cat.name}
                          </Link>
                          <ul className="mega-menu-list">
                            {cat.subcategories.map(sub => (
                              <li key={sub}>
                                <Link
                                  to={`/shop/${cat.id}?sub=${sub.toLowerCase()}`}
                                  onClick={() => { setActiveDropdown(null); setIsMobileMenuOpen(false) }}
                                >
                                  {sub}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mega-menu-banner">
                      <div className="mega-banner-content">
                        <p className="mega-banner-tag">New Arrivals</p>
                        <h4>Festive Collection 2026</h4>
                        <Link to="/collections/festive-glam" className="btn btn-sm btn-accent" onClick={() => setActiveDropdown(null)}>
                          Explore Now
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/collections" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </nav>

          <div className="header-actions">
            <button className="action-btn" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <FiSearch />
            </button>
            <button
              className="action-btn"
              onClick={() => navigate(user ? '/profile' : '/login')}
              aria-label="Account"
            >
              <FiUser />
            </button>
            <button
              className="action-btn"
              onClick={() => navigate('/wishlist')}
              aria-label="Wishlist"
            >
              <FiHeart />
              {wishlistItems.length > 0 && <span className="action-badge">{wishlistItems.length}</span>}
            </button>
            <button
              className="action-btn cart-btn"
              onClick={() => navigate('/cart')}
              aria-label="Cart"
            >
              <FiShoppingBag />
              {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  )
}
