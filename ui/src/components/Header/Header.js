import React from 'react';
import logo from './logo.png';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Kareley" />
            <Navbar />
        </header>
    )
}

export default Header;