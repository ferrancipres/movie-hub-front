
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'

export const Footer = () => {
    return (
        <footer className="footer-container">
            <section className="social-icons">
                <a className="icon-social" href="#red-social-1"><FaFacebook /></a>
                <a className="icon-social" href="#red-social-2"><FaTwitter /></a>
                <a className="icon-social" href="#red-social-3"><FaInstagram /></a>
            </section>
            <section className="info-wrapper">
                <p>Conditions of use</p>
                <p>Privacy & Policy</p>
                <p>Press Room</p>
            </section>
            <section className="rights-wrapper">
                <p>© 2023 Movie Tracker by Ferran at AIT</p>
            </section>
        </footer>
    );
};
