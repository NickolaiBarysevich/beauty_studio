import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import AdminMenu from './AdminMenu/AdminMenu'
import {Route, Router, Switch} from "react-router-dom";
import './App.scss';
import {connect} from "react-redux";
import Footer from "./Footer/Footer";
import UserProfile from './UserProfile/UserProfile'
import history from '../history/history'

const App = ({role}) => (
    <Router history={history}>
        <Switch>
            <div id="content">
                <Header/>
                <Route exact path="/" component={role === "ADMIN" ? AdminMenu : Main}/>
                {
                    role === "USER"
                        ? <Route path="/profile" component={UserProfile}/>
                        : ""
                }
                <Footer/>
            </div>
        </Switch>
    </Router>
);

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(App);
