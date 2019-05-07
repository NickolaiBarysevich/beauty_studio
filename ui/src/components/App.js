import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import AdminMenu from './AdminMenu/AdminMenu'

import './App.scss';
import {connect} from "react-redux";

const App = ({role}) => (
    <div id="content">
        <Header />
        {
            role === "ADMIN"
            ? <AdminMenu />
            : <Main />
        }
    </div>
);

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(App);
