import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/eco-stats-peru-nav-logo.svg';
import peru from '../assets/peru.svg';
import llama from '../assets/llama.svg';

function Home() {
    return (
        <>

            <nav>
                <ul>
                    <li>
                        <Link to="/"><img src={logo} alt="logo" /></Link>
                    </li>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/stats">STATS</Link>
                    </li>
                    <li>
                        <Link to="/resources">RESOURCES</Link>
                    </li>
                    <li>
                        <Link to="/about">ABOUT</Link>
                    </li>
                </ul>
            </nav>


            <header>

                <h1>Eco Stats Perú</h1>

                <p>According to <a href="https://www.esa.org/about/what-does-ecology-have-to-do-with-me/" target="_blank" rel="noopeneer noreferrer">The Ecological Society of America</a>, <b>Ecology</b> is defined as:</p>

                <q>The study of the relationships between living organisms, including humans, and their physical environment; it seeks to understand the vital connections between plants and animals and the world around them. Ecology also provides information about the benefits of ecosystems and how we can use Earth’s resources in ways that leave the environment healthy for future generations.</q>

                <p>While <b>Statistics</b> come to be <q>the science of collecting, displaying, and analysing data</q> according to <a href="https://www.oxfordreference.com/view/10.1093/acref/9780199541454.001.0001/acref-9780199541454-e-1566?rskey=nxhBLl&result=1979" target="_blank" rel="noopeneer noreferrer">Oxford Reference</a>.</p>

                <p>Thus, this site aims to show data that raise awareness about how Peruvians are influencing our environment, how we impact its resources and how we influence climate change, based on open data.</p>

                <img src={peru} alt="peru" />
                <img src={llama} alt="llama" />

            </header>
        </>
    )
}

export default Home
