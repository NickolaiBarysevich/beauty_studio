import React from "react";
import Login from "../Login/Login";

import "./Navbar.scss";
import {connect} from "react-redux";
import {logout} from "../../authorization/actions/AuthorizationActions";

const Navbar = props => {
    return (
        <nav>
            <ul>
                {
                    props.role !== "ADMIN"
                        ? <li><a href='#aboutUs'>О нас</a></li>
                        : ""
                }
                {
                    props.role !== "ADMIN"
                        ? <li><a href='#courses'>Наши курсы</a></li>
                        : ""
                }
                {
                    !props.token
                        ? <Login/>
                        : <li><a href='#' onClick={props.logout}>Выйти</a></li>
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
