import React from 'react';
import logo from './logo.png';
import Navbar from '../Navbar/Navbar';
import './Header.scss';

const Header = () => {
    return (
        <header>
            <a href="/"><img src={logo} alt="Kareley"/></a>
            <Navbar/>
        </header>
    )
};

export default Header;
