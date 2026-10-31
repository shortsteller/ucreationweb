import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiLogOut, FiEdit } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="profile-empty">
        <div className="container">
          <h2>Please Sign In</h2>
          <p>You need to sign in to view your profile.</p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
          <div><h1>{user.name}</h1><p>{user.email}</p></div>
          <button className="btn btn-secondary btn-sm"><FiEdit /> Edit Profile</button>
        </div>
        <div className="profile-grid">
          <div className="profile-card">
            <FiPackage className="profile-card-icon" />
            <h3>My Orders</h3>
            <p>Track and manage your orders</p>
            <Link to="/track-order" className="btn btn-sm btn-secondary">View Orders</Link>
          </div>
          <div className="profile-card">
            <FiHeart className="profile-card-icon" />
            <h3>Wishlist</h3>
            <p>Your saved favorites</p>
            <Link to="/wishlist" className="btn btn-sm btn-secondary">View Wishlist</Link>
          </div>
          <div className="profile-card">
            <FiUser className="profile-card-icon" />
            <h3>Account Settings</h3>
            <p>Manage your account details</p>
            <button className="btn btn-sm btn-secondary">Edit Settings</button>
          </div>
          <div className="profile-card">
            <FiLogOut className="profile-card-icon" />
            <h3>Sign Out</h3>
            <p>Sign out of your account</p>
            <button className="btn btn-sm btn-secondary" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <div className="profile-section">
          <h2>Saved Addresses</h2>
          <p className="placeholder-text">No addresses saved yet. Add an address during checkout and it will appear here.</p>
        </div>
      </div>
    </div>
  )
}

