import * as React from 'react';
import './styles/Footer.css';

class Footer extends React.Component {

    render() {

        return (
            <div>
                <div className="footer-container">
                    <div className="contactUs">
                        <h5>Contact Us</h5>
                        <h5>neophytes@gmail.com</h5>
                    </div>
                    <div className="needHelp">
                    <h5>Need Help?</h5>
                    <h5>FAQ<br />Support / Contact Us</h5>
                    </div>
                    <div className="about">
                    <h5>About Neophytes</h5>
                    <h5>About Neophytes<br />Work with us<br />Github</h5>
                    </div>
                    <div className="subscribe">
                    <h5>Subscribe to Neophytes via Email</h5>
                    
                    <input className="emailInput" type="text" placeholder="email" />
                    <button className="subscribeButton">Subscribe</button>
                    
                    </div>
                </div>
            </div>
        );
    }

}

export default Footer;