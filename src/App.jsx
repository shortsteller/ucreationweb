import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import AnnouncementBar from './components/Layout/AnnouncementBar'
import BottomNav from './components/Layout/BottomNav'
import SearchModal from './components/Common/SearchModal'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Collections from './pages/Collections'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import TrackOrder from './pages/TrackOrder'
import Policies from './pages/Policies'
import ScrollToTop from './components/Common/ScrollToTop'
import './App.css'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="app">
      <ScrollToTop />
      <AnnouncementBar />
      <Header isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/policies/:type" element={<Policies />} />
        </Routes>
      </main>

      <Footer />
      <BottomNav onOpenSearch={() => setIsSearchOpen(true)} />
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </div>
  )
}

export default App
