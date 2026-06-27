import React from 'react';
import { ThermometerSnowflake, MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <ThermometerSnowflake className="logo-icon" />
            <span>Kasun Auto</span>
          </div>
          <p className="footer-desc">
            Premium Auto Air Conditioning repair, maintenance, and diagnostics. Keeping you cool on the road since 2010.
          </p>

        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-list">
            <li><a href="#">AC Diagnostics</a></li>
            <li><a href="#">Re-gassing & Recharge</a></li>
            <li><a href="#">Compressor Repair</a></li>
            <li><a href="#">System Cleaning</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="footer-list contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>123 Cooling Avenue, Tech Park, Colombo</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+94 77 123 4567</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>info@kasunauto.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kasun Auto AC Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
