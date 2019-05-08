import React, {Component} from 'react'
import {getUsers} from "../../api/UserRequests";
import {connect} from "react-redux";
import AdminUser from '../AdminUser/AdminUser'

class AdminUsers extends Component {

    state = {
        users: []
    };

    componentWillMount() {
        this.getUsers();
    }

    getUsers = () => {
        const {token, handleError} = this.props;
        getUsers(token)
            .then(response => {
                if (!response.errorCode) {
                    this.setState({users: response})
                } else {
                    handleError(response.message)
                }
            })
            .catch(err => handleError("Сервер не доступен"))
    };

    render() {
        const userComponent = this.state.users.map(user =>
            user.role !== "ADMIN" ? <AdminUser user={user} refresh={this.getUsers}/> : ""
        );
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя пользователя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Роль</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                {userComponent}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminUsers);