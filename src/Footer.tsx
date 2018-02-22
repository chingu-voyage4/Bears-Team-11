import * as React from 'react';
import './styles/Footer.css';

class Footer extends React.Component {

    render() {

        return (
            <div>
                <div className="footer-container">
                    <div className="contactUs">
                        <h5 className="footer-subtitle">Contact Us</h5>
                        <h5 className="footer-subcategories">hello@projectmatch.com</h5>
                    </div>
                    <div className="needHelp">
                        <h5 className="footer-subtitle">Need Help?</h5>
                        <h5 className="footer-subcategories">FAQ</h5>
                        <h5 className="footer-subcategories">Support / Contact Us</h5>
                    </div>
                    <div className="about">
                        <h5 className="footer-subtitle">About Project Match</h5>
                        <h5 className="footer-subcategories">About Project Match</h5>
                        <h5 className="footer-subcategories">Github</h5>
                    </div>
                    <div className="subscribe">
                        <h5 className="footer-subtitle">Subscribe to Project Match via Email</h5>
                        <input className="emailInput" type="text" placeholder="Email Address" />
                        <button className="subscribeButton">SUBSCRIBE</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;