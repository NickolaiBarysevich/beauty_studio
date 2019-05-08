import React from 'react';
import logo from './logo.png';
import './Footer.scss';
import $ from 'jquery';

const Footer = () => {
    $(function() {
        $(window).scroll(function() {
            if($(this).scrollTop() !== 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });
        $('#toTop').click(function() {
            $('body,html').animate({scrollTop:0},800);
        });
    });

    return (
        <footer>
            <button id="toTop">
                <img src={logo} alt="Kareley" />
            </button>
            <p>COPYRIGHT &copy; ALIAKSANDRA RYBAK</p>
        </footer>
    )
}

export default Footer;
