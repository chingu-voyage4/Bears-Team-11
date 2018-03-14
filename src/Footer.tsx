import * as React from 'react';
import './styles/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-max-container">
        <div className="footer-container">
          <div className="contactUs">
            <div className="footer-subtitle">Contact Us</div>
            <div className="footer-subcategories">hello@projectmatch.com</div>
          </div>
          <div className="needHelp">
            <div className="footer-subtitle">Need Help?</div>
            <div className="footer-subcategories">FAQ</div>
            <div className="footer-subcategories">Support / Contact Us</div>
          </div>
          <div className="about">
            <div className="footer-subtitle">About Project Match</div>
            <div className="footer-subcategories">About Project Match</div>
            <div className="footer-subcategories">Github</div>
          </div>
          <div className="subscribe">
            <div className="footer-subtitle subscribe-subtitle">
              Subscribe to Project Match via Email
            </div>
            <input
              className="emailInput"
              type="text"
              placeholder="Email Address"
            />
            <button className="subscribeButton">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
