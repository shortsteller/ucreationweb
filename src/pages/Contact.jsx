import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We would love to hear from you</p>
        </div>
      </div>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>Have a question, suggestion, or just want to say hi? Reach out to us through any of the channels below.</p>
            <div className="contact-details">
              <div className="contact-detail"><FiMail /><div><strong>Email</strong><a href="mailto:hello@uditascreations.com">hello@uditascreations.com</a></div></div>
              <div className="contact-detail"><FiPhone /><div><strong>Phone</strong><a href="tel:+919876543210">+91 98765 43210</a></div></div>
              <div className="contact-detail"><FiMapPin /><div><strong>Address</strong><span>Mumbai, Maharashtra, India</span></div></div>
            </div>
            <div className="contact-hours">
              <h3>Business Hours</h3>
              <p>Monday - Saturday: 10:00 AM - 7:00 PM IST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            <div className="form-row">
              <div className="form-group"><label>Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="Your name" /></div>
              <div className="form-group"><label>Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="your@email.com" /></div>
            </div>
            <div className="form-group"><label>Subject</label><input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required placeholder="What is this about?" /></div>
            <div className="form-group"><label>Message</label><textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required placeholder="Tell us more..." rows={5} /></div>
            <button type="submit" className="btn btn-primary btn-lg"><FiSend /> Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

