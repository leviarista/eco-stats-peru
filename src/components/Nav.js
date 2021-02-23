import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/eco-stats-peru-nav-logo.svg';
import home from '../assets/home.svg';
import stats from '../assets/stats.svg';
import leaf from '../assets/leaf.svg';
import about from '../assets/about.svg';
import GitHubCorner from '../assets/GitHubCorner';

const Nav = () => {
    return (
        <nav className="nav">
            <div className="logo">
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <ul>
                <li>
                    <Link to="/">
                        <img src={home} alt="HOME" />
                        HOME
                    </Link>
                </li>
                <li>
                    <Link to="/stats">
                        <img src={stats} alt="STATS" />
                        STATS
                    </Link>
                </li>
                {/* <li>
                    <Link to="/resources">
                        <img src={leaf} alt="RESOURCES" />
                        RESOURCES
                    </Link>
                </li> */}
                <li>
                    <Link to="/about">
                        <img src={about} alt="ABOUT" />
                        ABOUT
                    </Link>
                </li>
                <a href="https://github.com/leviarista/eco-stats-peru" target="_blank" rel="noopenner noreferrer" className="github-corner" aria-label="View source on GitHub">
                    <GitHubCorner />
                </a>
            </ul>
        </nav>
    )
}

export default Nav
