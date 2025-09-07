import "./styles.css";

import GithubIcon from '../../assets/icon/github.svg?react';
import GmailIcon from '../../assets/icon/gmail.svg?react';
import LinkedinIcon from '../../assets/icon/linkedin.svg?react';
import TelegramIcon from '../../assets/icon/telegram.svg?react';

const Footer = () => {
    return (
        <footer className="footer bg-white">

            <div className="container">

                <nav className="nav-links">
                    <a href="#">About</a>
                    <a href="#">Projects</a>
                    <a href="#">Contact</a>
                </nav>

                <div className="social-links">

                    <a href="https://github.com/i-JSS" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="icon-footer" />
                    </a>
                    <a href="mailto:js2snc@gmail.com" aria-label="Gmail" target="_blank" rel="noopener noreferrer">
                        <GmailIcon className="icon-footer" />
                    </a>
                    <a href="https://www.linkedin.com/in/i-jss/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="icon-footer" />
                    </a>
                    <a href="https://t.me/Joao_G_Carvalho" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                        <TelegramIcon className="icon-footer" />
                    </a>

                </div>

                <p className="copy">
                    &copy; {new Date().getFullYear()} João Ginuino. All rights reserved.
                </p>

            </div>

        </footer>
    );
};

export default Footer;
