import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href='#aboutUs'>О нас</a></li>
                <li><a href='#courses'>Наши курсы</a></li>
                <li><a href='#'>Записаться</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;
