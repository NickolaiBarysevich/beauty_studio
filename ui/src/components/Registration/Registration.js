import React, {Component} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {signUp} from "../../api/UserRequests";
import $ from "jquery"
import './Registration.scss'

class Registration extends Component {
    state = {
        username: '',
        password: '',
        repPassword: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        error: null
    };

    componentDidMount() {
        $(".alert").hide()
    }

    dropState = () => {
        this.setState({
            username: '',
            password: '',
            repPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            error: null
        })
    };

    handleSignUp = () => {
        signUp(this.state)
            .then(response => {
                if (response.status === 201) {
                    this.props.toggleSignIn();
                    this.dropState();
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
            <div className="px-4 py-3 form-container">
                <AvForm onValidSubmit={this.handleSignUp}>
                    <AvField
                        name="Username"
                        type="text"
                        errorMessage="Обязательное поле"
                        placeholder="Имя пользователя"
                        value={this.state.username}
                        validate={{
                            required: {value: true},
                        }}
                        onChange={event => {
                            const username = event.target.value;
                            this.setState({
                                username: username,
                            });

                        }}/>
                    <AvField
                        required
                        name="RegPassword"
                        type="password"
                        errorMessage="Обязательное поле"
                        placeholder="Пароль"
                        value={this.state.password}
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
                    <AvField
                        required
                        name="RepPassword"
                        type="password"
                        placeholder="Повторите пароль"
                        value={this.state.repPassword}
                        validate={{
                            required: {value: true, errorMessage: "Обязательное поле"},
                            match: {value: "RegPassword", errorMessage: "Пароли не совпадают"}
                        }}
                    />
                    <AvField
                        name="FirstName"
                        type="text"
                        errorMessage="Обязательное поле"
                        placeholder="Имя"
                        value={this.state.firstName}
                        validate={{
                            required: {value: true},
                        }}
                        onChange={event => {
                            const firstName = event.target.value;
                            this.setState({
                                firstName: firstName,
                            });

                        }}/>
                    <AvField
                        name="LastName"
                        type="text"
                        errorMessage="Обязательное поле"
                        placeholder="Фамилия"
                        value={this.state.lastName}
                        validate={{
                            required: {value: true},
                        }}
                        onChange={event => {
                            const lastName = event.target.value;
                            this.setState({
                                lastName: lastName,
                            });
                        }}/>
                    <AvField
                        name="PhoneNumber"
                        type="text"
                        errorMessage="Обязательное поле"
                        placeholder="Номер телефона"
                        value={this.state.phoneNumber}
                        validate={{
                            required: {value: true},
                        }}
                        onChange={event => {
                            const phoneNumber = event.target.value;
                            this.setState({
                                phoneNumber: phoneNumber,
                            });
                        }}/>
                    <AvField
                        name="Email"
                        placeholder="Email"
                        value={this.state.email}
                        validate={{
                            required: {value: true, errorMessage: "Обязательное поле"},
                            email: {value: true, errorMessage: "Email указан неверно"}
                        }}
                        onChange={event => {
                            const email = event.target.value;
                            this.setState({
                                email: email,
                            });
                        }}/>
                    <button type="submit" className="btn btn-outline-info">Зарегистрироваться</button>
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

export default Registration;