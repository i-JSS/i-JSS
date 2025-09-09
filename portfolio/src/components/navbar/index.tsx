import { useState, useEffect } from "react";
import "./styles.css";

import Search from '../../assets/icon/search.svg?react';
import Translate from '../../assets/icon/translate.svg?react';
import WhiteIcon from '../../assets/icon/whiteIcon.svg?react';
import DarkIcon from '../../assets/icon/darkIcon.svg?react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(darkMode ? "dark" : "light");
    }, []);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className="navbar-container">
            <div className="navbar">
                <p className="navbar-logo">JSS</p>

                <button
                    className={`navbar-menu-btn ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
                    <li><a href="/">Sobre</a></li>
                    <li><a href="/">Projetos</a></li>
                    <li><a href="/">Skills</a></li>
                    <li><a href="#certifications">Certificações</a></li>
                    <li><a href="/">Referências</a></li>
                    <li><a href="/">Contatos</a></li>
                </ul>

                <div className="navbar-icons">
                    <button className="icon-btn">
                        <Search className="icon-navbar"/>
                    </button>
                    <button className="icon-btn">
                        <Translate className="icon-navbar"/>
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "dark" ? (
                            <DarkIcon className="icon-navbar"/>
                        ) : (
                            <WhiteIcon className="icon-navbar"/>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
