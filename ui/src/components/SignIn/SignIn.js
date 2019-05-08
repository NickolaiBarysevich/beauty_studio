import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {addUser} from "../../authorization/actions/AuthorizationActions";
import {signIn} from "../../api/UserRequests";
import {connect} from "react-redux";
import $ from "jquery"
import '../Login/Login.scss'

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        error: null
    };

    componentDidMount() {
        $(".alert").hide()
    }

    handleSignIn = () => {
        signIn(this.state.username, this.state.password)
            .then(response => {
                if (!response.errorCode) {
                    this.props.addUser(
                        response.username,
                        response.token,
                        response.userRole
                    );
                } else {
                    this.setState({error: response.message});
                    $(".alert").show();
                }
            })
            .catch(error => {
                this.setState({error: "Сервер недоступен"});
                $(".alert").show();
            })
    };

    render() {
        return (
            <div className="px-4 py-3">
                <AvForm onValidSubmit={this.handleSignIn}
                >
                    <AvField
                        name="Username"
                        type="text"
                        errorMessage="Укажите имя пользователя"
                        placeholder="Имя пользователя"
                        validate={{
                            required: {value: true},
                        }}
                        onChange={event => {
                            const username = event.target.value;
                            this.setState({
                                username: username,
                            });

                        }}
                    />
                    <AvField
                        required
                        name="Password"
                        type="password"
                        errorMessage="Укажите пароль"
                        placeholder="Пароль"
                        validate={{
                            required: {value: true}
                        }}
                        onChange={event => {
                            const password = event.target.value;
                            this.setState({
                                password: password,
                            });

                        }}
                    />
                    <button type="submit" className="btn btn-outline-info">Войти</button>
                </AvForm>
                <form>
                    <div className="alert-margin alert alert-danger alert-dismissible fade show" role="alert">
                        {this.state.error}
                        <button type="button" className="close" onClick={() => $(".alert").hide()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

const mapDispatchToProps = dispatch => ({
    addUser: (username, token, role) => dispatch(addUser(username, token, role))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);