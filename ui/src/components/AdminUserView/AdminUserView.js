import React, {Component} from 'react';
import $ from "jquery";
import {connect} from "react-redux";
import {setUserRole} from "../../api/UserRequests";

class AdminUserView extends Component {

    state = {
        error: null,
    };

    handleSetRole = role => {
        const {token, user, refresh} = this.props;
        setUserRole(user.id, role, token)
            .then(response => {
                if (!response.errorCode) {
                    refresh();
                } else {
                    this.setState({error: response.message});
                    $(".alert").show()
                }
            })
            .catch(err => {
                this.setState({error: "Сервер недоступен"});
                $(".alert").show()
            });
    };

    componentDidMount() {
        $(".alert").hide()
    }

    render() {
        const {user, role, id} = this.props;
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id={id}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Клиент</h5>
                            <button type="button" className="close" onClick={() => $(document).ready(() => {
                                $('#' + id).modal('hide');
                            })} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {this.state.error}
                                <button type="button" className="close" onClick={() => $(".alert").hide()}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <p>Номер: {user.id}</p>
                            <p>Имя пользователя: {user.username}</p>
                            <p>Имя: {user.firstName}</p>
                            <p>Фамилия: {user.lastName}</p>
                            <p>Email: {user.email}</p>
                            <p>Номер телефона: {user.phoneNumber}</p>
                        </div>
                        <div className="modal-footer">
                            {
                                user.role === "USER" && role === "ADMIN"
                                    ? <button className="btn btn-info" onClick={() => this.handleSetRole('TEACHER')}>Сделать учителем</button>
                                    :
                                    user.role === "TEACHER" && role === "ADMIN"
                                        ? <button className="btn btn-info" onClick={() => this.handleSetRole('USER')}>Сделать клиентом</button>
                                        : ""
                            }
                            <button type="button" className="btn btn-secondary" onClick={() => $(document).ready(() => {
                                $('#' + id).modal('hide');
                            })}>Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminUserView);