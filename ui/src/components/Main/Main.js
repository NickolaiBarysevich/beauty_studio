import React from 'react';
import './Main.css';
import Intro from '../Intro/Intro';
import AboutUs from '../AboutUs/AboutUs';
import Courses from '../Courses/Courses';

const Main = () => {
    return (
        <main>
            <Intro />
            <AboutUs />
            <Courses />
        </main>
    )
}

export default Main;