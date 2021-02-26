import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/eco-stats-peru-nav-logo.svg';
import home from '../assets/home.svg';
import stats from '../assets/stats.svg';
import leaf from '../assets/leaf.svg';
import about from '../assets/about.svg';
import GitHubCorner from '../assets/GitHubCorner';
import githubLogo from '../assets/github-logo.svg';

const Nav = () => {

    const toogleNav = () => {
        let nav = document.getElementById("nav");
        nav.className = nav.className === "nav" ? "nav responsive" : nav.className = "nav";
    }

    const hideNav = () => {
        let nav = document.getElementById("nav");
        nav.className = "nav";
    }

    return (
        <nav id="nav" className="nav">
            <div className="logo">
                <Link to="/" onClick={hideNav}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/" onClick={hideNav}>
                        <img src={home} alt="HOME" />
                        HOME
                    </Link>
                </li>
                <li>
                    <Link to="/stats" onClick={hideNav}>
                        <img src={stats} alt="STATS" />
                        STATS
                    </Link>
                </li>
                <li>
                    <Link to="/solutions" onClick={hideNav}>
                        <img src={leaf} alt="SOLUTIONS" />
                        SOLUTIONS
                    </Link>
                </li>
                <li>
                    <Link to="/about" onClick={hideNav}>
                        <img src={about} alt="ABOUT" />
                        ABOUT
                    </Link>
                </li>
                <li className="hidden-sm">
                    <a href="https://github.com/leviarista/eco-stats-peru" target="_blank" rel="noopenner noreferrer" className="show-xs" aria-label="View source on GitHub">
                        <img src={githubLogo} alt="GitHub Logo" /> GitHub
                    </a>
                </li>
            </ul>
            <a href="https://github.com/leviarista/eco-stats-peru" target="_blank" rel="noopenner noreferrer" className="github-corner hidden-xs" aria-label="View source on GitHub">
                <GitHubCorner />
            </a>
            <a href="#" className="icon" onClick={toogleNav}>
                <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.5 15H0V12.5H22.5V15ZM22.5 8.75H0V6.25H22.5V8.75ZM22.5 2.5H0V0H22.5V2.5Z" fill="black" />
                </svg>
            </a>

        </nav>
    )
}

export default Nav
