import React from 'react';
import githubLogo from '../assets/github-logo.svg';

const Footer = () => {
    return (
        <footer className="footer">
            <a href="https://github.com/leviarista/eco-stats-peru" target="_blank" rel="noopenner noreferrer">
                Take a look at this project on GitHub
                <img src={githubLogo} alt="GitHub Logo" />
            </a>
        </footer>
    )
}

export default Footer
