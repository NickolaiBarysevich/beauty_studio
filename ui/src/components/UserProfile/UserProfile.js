import React, {Component} from 'react'
import UserOrder from '../UserOrder/UserOrder'
import {getUserOrders} from "../../api/OrderRequests";
import {connect} from "react-redux";
import $ from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import './UserProfile.scss'

class UserProfile extends Component {

    state = {
        orders: [],
        error: null
    };

    componentDidMount() {
        $(".alert").hide();
    }

    componentWillMount() {
        this.getUserOrders();
    }

    getUserOrders = () => {
        const {token} = this.props;
        getUserOrders(token)
            .then(response => {
                if (!response.errorCode) {
                    this.setState({
                        orders: response
                    })
                } else {
                    this.handleError(response.message)
                }
            })
            .catch(reason => this.handleError("Сервер недоступен"))
    };

    handleError = error => {
        this.setState({error: error});
        $(".alert").show()
    };

    render() {
        const userOrdersComponents = this.state.orders.map(order =>
            <UserOrder order={order} handleError={this.handleError} refresh={this.getUserOrders}/>
        );
        return (
            <div className="container order-container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="alert-margin alert alert-danger alert-dismissible fade show courses-alert"
                             role="alert">
                            {this.state.error}
                            <button type="button" className="close" onClick={() => $(".alert").hide()}
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Время заказа</th>
                                <th scope="col">Название курса</th>
                                <th scope="col">Статус</th>
                                <th scope="col">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userOrdersComponents.length !== 0
                                    ? userOrdersComponents
                                    : ""
                            }
                            </tbody>
                        </table>
                        {
                            userOrdersComponents.length === 0
                                ? <span>Вы ещё не записались ни на один курс</span>
                                : ""
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(UserProfile);