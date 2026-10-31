import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX, FiChevronDown, FiChevronRight, FiPackage, FiHelpCircle } from 'react-icons/fi'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/products'
import SearchModal from '../Common/SearchModal'
import './Header.css'

export default function Header({ isSearchOpen, setIsSearchOpen }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null)
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)

  const { cartCount } = useCart()
  const { wishlistItems } = useWishlist()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    setIsMobileShopOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleMobileCategory = (catId, e) => {
    e.stopPropagation()
    setExpandedMobileCategory(prev => prev === catId ? null : catId)
  }

  return (
    <>
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <Link to="/" className="header-logo">
            <span className="logo-text">Uditas</span>
            <span className="logo-sub">Creations</span>
          </Link>

          {/* Navigation Drawer for Desktop & Mobile */}
          <nav className={`header-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <div className="nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="nav-content">
              {/* Mobile Drawer Top Bar */}
              <div className="nav-header-mobile">
                <Link to="/" className="header-logo" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="logo-text">Uditas</span>
                  <span className="logo-sub">Creations</span>
                </Link>
                <button
                  className="nav-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>
              </div>

              {/* Mobile Drawer User Card */}
              <div className="nav-user-mobile">
                <div className="nav-user-avatar">
                  <FiUser />
                </div>
                <div className="nav-user-info">
                  {user ? (
                    <>
                      <strong>Hi, {user.name}</strong>
                      <Link to="/profile" className="nav-user-link">View Profile</Link>
                    </>
                  ) : (
                    <>
                      <strong>Welcome to Uditas</strong>
                      <div className="nav-auth-links">
                        <Link to="/login">Sign In</Link>
                        <span>|</span>
                        <Link to="/register">Register</Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="nav-links-wrapper">
                <Link to="/" className="nav-link">Home</Link>

                {/* Shop with Desktop Dropdown & Mobile Accordion */}
                <div
                  className={`nav-dropdown ${isMobileShopOpen ? 'mobile-expanded' : ''}`}
                  onMouseEnter={() => setActiveDropdown('shop')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="nav-link-row">
                    <Link to="/shop" className="nav-link nav-link-shop">
                      Shop Catalog
                    </Link>
                    <button
                      className="mobile-expand-btn"
                      onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                      aria-label="Expand jewelry categories"
                    >
                      <FiChevronDown className={`dropdown-icon ${isMobileShopOpen ? 'rotated' : ''}`} />
                    </button>
                  </div>

                  {/* Desktop Mega Menu & Mobile Sub-items */}
                  {(activeDropdown === 'shop' || isMobileShopOpen) && (
                    <div className="dropdown-menu mega-menu">
                      <div className="mega-menu-grid">
                        {categories.map(cat => (
                          <div key={cat.id} className="mega-menu-col">
                            <div className="category-title-row">
                              <Link
                                to={`/shop/${cat.id}`}
                                className="mega-menu-title"
                                onClick={() => { setActiveDropdown(null); setIsMobileMenuOpen(false) }}
                              >
                                <span className="cat-icon">{cat.icon}</span> {cat.name}
                              </Link>
                              <button
                                className="cat-mobile-subtoggle"
                                onClick={(e) => toggleMobileCategory(cat.id, e)}
                                aria-label={`Toggle ${cat.name} subcategories`}
                              >
                                <FiChevronRight className={`arrow-icon ${expandedMobileCategory === cat.id ? 'rotated' : ''}`} />
                              </button>
                            </div>

                            <ul className={`mega-menu-list ${expandedMobileCategory === cat.id ? 'mobile-show' : ''}`}>
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
                          <h4>Festive &amp; Bridal Collection 2026</h4>
                          <Link
                            to="/collections/wedding-edit"
                            className="btn btn-sm btn-accent"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Explore Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/collections" className="nav-link">Collections</Link>
                <Link to="/about" className="nav-link">Our Story</Link>
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </div>

              {/* Mobile Drawer Bottom Shortcuts */}
              <div className="nav-footer-mobile">
                <Link to="/track-order" className="drawer-shortcut">
                  <FiPackage /> <span>Track My Order</span>
                </Link>
                <Link to="/policies/shipping" className="drawer-shortcut">
                  <FiHelpCircle /> <span>Shipping &amp; Policies</span>
                </Link>
              </div>
            </div>
          </nav>

          {/* Desktop & Tablet Action Icons */}
          <div className="header-actions">
            <button
              className="action-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search jewelry"
            >
              <FiSearch />
            </button>

            <button
              className="action-btn desktop-only"
              onClick={() => navigate(user ? '/profile' : '/login')}
              aria-label="Account"
            >
              <FiUser />
            </button>

            <button
              className="action-btn desktop-only"
              onClick={() => navigate('/wishlist')}
              aria-label="Wishlist"
            >
              <FiHeart />
              {wishlistItems.length > 0 && (
                <span className="action-badge">{wishlistItems.length}</span>
              )}
            </button>

            <button
              className="action-btn cart-btn"
              onClick={() => navigate('/cart')}
              aria-label="Shopping Cart"
            >
              <FiShoppingBag />
              {cartCount > 0 && (
                <span className="action-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
