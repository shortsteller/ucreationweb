import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock, FiMapPin, FiPhoneCall } from 'react-icons/fi'
import './TrackOrder.css'

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleTrack = (e) => {
    e.preventDefault()
    setSearched(true)

    // Mock tracking status response (ready for Firebase / Shiprocket / Delhivery API integration)
    const mockOrderNum = orderId.trim() || 'UC89234102'
    setTrackingData({
      orderId: mockOrderNum,
      datePlaced: 'October 28, 2026',
      estimatedDelivery: 'November 03, 2026',
      courier: 'Bluedart Express',
      awb: 'BD849204910IN',
      status: 'In Transit',
      items: [
        { name: 'Golden Kundan Choker Set', qty: 1, price: 1299 },
        { name: 'Oxidised Silver Jhumka Earrings', qty: 2, price: 998 }
      ],
      destination: 'New Delhi, India',
      timeline: [
        { title: 'Order Confirmed', time: 'Oct 28, 2026 - 11:30 AM', completed: true, desc: 'Your order was verified and approved for crafting.' },
        { title: 'Handcrafted & Packed', time: 'Oct 29, 2026 - 04:15 PM', completed: true, desc: 'Artisans finished quality inspection and premium packaging.' },
        { title: 'Dispatched via Courier', time: 'Oct 30, 2026 - 09:40 AM', completed: true, desc: 'Handed over to Bluedart Express (AWB: BD849204910IN).' },
        { title: 'In Transit', time: 'Oct 31, 2026 - 10:15 AM', current: true, completed: false, desc: 'Package arrived at regional sorting hub and is in route.' },
        { title: 'Out for Delivery', time: 'Expected Nov 03, 2026', completed: false, desc: 'Assigned to delivery agent.' },
        { title: 'Delivered', time: 'Pending', completed: false, desc: 'Package handed over to recipient.' }
      ]
    })
  }

  return (
    <div className="track-order-page">
      <div className="track-order-hero">
        <div className="container">
          <h1>Track Your Shipment</h1>
          <p>Real-time delivery updates for your handcrafted Uditas Creations jewelry</p>
        </div>
      </div>

      <div className="container track-content-wrapper">
        <div className="track-search-card">
          <form onSubmit={handleTrack} className="track-form">
            <div className="track-input-group">
              <label>Order Number / ID</label>
              <div className="input-with-icon">
                <FiPackage className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. UC89234102"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="track-input-group">
              <label>Registered Phone or Email</label>
              <div className="input-with-icon">
                <FiSearch className="input-icon" />
                <input
                  type="text"
                  placeholder="e.g. 9876543210 or your@email.com"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary track-btn">
              <FiSearch /> Track Status
            </button>
          </form>
          <p className="track-hint">
            Tip: You can find your Order Number in the SMS / confirmation email sent to you upon placing your order.
          </p>
        </div>

        {searched && trackingData && (
          <div className="track-result-card animate-fade-in">
            <div className="track-header-bar">
              <div>
                <span className="order-pill">Order #{trackingData.orderId}</span>
                <h2>Status: <span className="status-highlight">{trackingData.status}</span></h2>
              </div>
              <div className="courier-badge">
                <FiTruck />
                <div>
                  <strong>{trackingData.courier}</strong>
                  <span>AWB: {trackingData.awb}</span>
                </div>
              </div>
            </div>

            <div className="track-meta-grid">
              <div className="meta-box">
                <FiClock className="meta-icon" />
                <div>
                  <span>Date Ordered</span>
                  <strong>{trackingData.datePlaced}</strong>
                </div>
              </div>
              <div className="meta-box">
                <FiTruck className="meta-icon" />
                <div>
                  <span>Estimated Delivery</span>
                  <strong className="delivery-date">{trackingData.estimatedDelivery}</strong>
                </div>
              </div>
              <div className="meta-box">
                <FiMapPin className="meta-icon" />
                <div>
                  <span>Shipping To</span>
                  <strong>{trackingData.destination}</strong>
                </div>
              </div>
            </div>

            <div className="tracking-timeline">
              <h3>Tracking History</h3>
              <div className="timeline-list">
                {trackingData.timeline.map((step, idx) => (
                  <div
                    key={idx}
                    className={`timeline-item ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}
                  >
                    <div className="timeline-marker">
                      {step.completed ? <FiCheckCircle /> : <span className="marker-dot" />}
                    </div>
                    <div className="timeline-info">
                      <div className="timeline-header-step">
                        <h4>{step.title}</h4>
                        <span className="timeline-time">{step.time}</span>
                      </div>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="track-items-summary">
              <h3>Items in this Shipment</h3>
              <div className="items-list">
                {trackingData.items.map((item, i) => (
                  <div key={i} className="item-row">
                    <span>{item.name} × {item.qty}</span>
                    <strong>₹{item.price.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="track-help-banner">
              <FiPhoneCall className="help-icon" />
              <div>
                <h4>Need assistance with this shipment?</h4>
                <p>Our concierge team is available Mon-Sat (10am - 7pm IST).</p>
              </div>
              <Link to="/contact" className="btn btn-secondary btn-sm">Contact Support</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

