import React, {Component} from 'react';
import SignIn from "../SignIn/SignIn"
import Registration from '../Registration/Registration'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            signIn: true
        };
    }

    toggleSignIn = () => {
        this.setState({signIn: !this.state.signIn})
    };

    render() {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Записаться
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    {
                        this.state.signIn
                            ? <SignIn/>
                            : <Registration toggleSignIn={this.toggleSignIn}/>
                    }
                    <div className="dropdown-divider"/>
                    <form>
                        {
                            this.state.signIn ? (
                                <a className="dropdown-item" onClick={this.toggleSignIn} href="#">
                                    Впервые здесь? <span>Зарегистрироваться</span>
                                </a>
                                ) : (
                                <a className="dropdown-item" onClick={this.toggleSignIn} href="#">
                                    У меня уже есть аккаунт
                                </a>
                            )
                        }
                    </form>
                </div>
            </li>
        )
    };
}

export default Login;
