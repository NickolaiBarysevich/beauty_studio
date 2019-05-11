import React from "react";
import Login from "../Login/Login";
import "./Navbar.scss";
import {connect} from "react-redux";
import {logout} from "../../authorization/actions/AuthorizationActions";
import history from "../../history/history"

const Navbar = ({role, token, logout}) => {
    return (
        <nav>
            <ul>
                {
                    role !== "ADMIN"
                        ? <li><a href='#aboutUs'>О нас</a></li>
                        : ""
                }
                {
                    role !== "ADMIN"
                        ? <li><a href='#courses'>Наши курсы</a></li>
                        : ""
                }
                {
                    role === "USER"
                        ? <li><a href='/profile'>Личный кабинет</a></li>
                        : ""
                }
                {
                    !token
                        ? <Login/>
                        : <li><a href='/' onClick={logout}>Выйти</a></li>
                }
            </ul>
        </nav>
    )
};

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
