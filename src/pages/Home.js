import React from 'react';
import { Link } from 'react-router-dom';
import ecoPeru from '../assets/flaticons/eco-peru.svg';
import statsWhite from '../assets/stats-white.svg';
import leafWhite from '../assets/leaf-white.svg';

function Home() {
    return (
        <div className="home-container">

            <header>

                <h1>Eco Stats Perú</h1>

                <p className="hidden-xs">According to <a href="https://www.esa.org/about/what-does-ecology-have-to-do-with-me/" target="_blank" rel="noopeneer noreferrer">The Ecological Society of America</a>, <b>Ecology</b> is defined as:</p>

                <q className="hidden-xs">The study of the relationships between living organisms, including humans, and their physical environment; it seeks to understand the vital connections between plants and animals and the world around them. Ecology also provides information about the benefits of ecosystems and how we can use Earth’s resources in ways that leave the environment healthy for future generations.</q>

                <p className="hidden-xs">While <b>Statistics</b> come to be <q>the science of collecting, displaying, and analysing data</q> according to <a href="https://www.oxfordreference.com/view/10.1093/acref/9780199541454.001.0001/acref-9780199541454-e-1566?rskey=nxhBLl&result=1979" target="_blank" rel="noopeneer noreferrer">Oxford Reference</a>.</p>

                <p className="text-highlight hidden-xs">Thus, this website aims to list solutions and show data that raise awareness about how Peruvians are influencing our environment, how we impact its resources and how we influence climate change, based on open data.</p>
                <p className="hidden-sm">Eco Stats Perú is a website aims to list solutions and show data that raise awareness about how Peruvians are influencing our environment, how we impact its resources and how we influence climate change, based on open data.</p>

                <div className="header-buttons">
                    <Link to="/stats" className="button button-main button-main-yellow">
                        <img src={statsWhite} alt="STATS" /> See Statistics
                    </Link>
                    <Link to="/solutions" className="button button-main button-main-green">
                        <img src={leafWhite} alt="RESOURCES" /> See Solutions
                    </Link>
                </div>

            </header>

            <section className="header-image">

                <img src={ecoPeru} alt="Peru" />

            </section>

        </div>
    )
}

export default Home
