import { useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { FiTruck, FiPercent, FiGift } from 'react-icons/fi'
import './AnnouncementBar.css'

const announcements = [
  { icon: <FiTruck />, text: 'Free Shipping on orders above ₹999' },
  { icon: <FiPercent />, text: 'Use code UDITAS20 for 20% off your first order' },
  { icon: <FiGift />, text: 'Buy 2 Get 1 Free on selected earrings!' },
]

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="announcement-icon">{announcements[currentIndex].icon}</span>
        <span className="announcement-text">{announcements[currentIndex].text}</span>
      </div>
      <button className="announcement-close" onClick={() => setIsVisible(false)} aria-label="Close announcement">
        <IoClose />
      </button>
    </div>
  )
}
