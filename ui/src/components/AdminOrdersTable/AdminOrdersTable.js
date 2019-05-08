import React, {Component} from 'react'
import {getOrders} from "../../api/OrderRequests";
import {connect} from "react-redux";
import AdminOrder from "../AdminOrder/AdminOrder"

class AdminOrdersTable extends Component {

    state = {
        orders: []
    };

    componentWillMount() {
        this.getOrders();
    }

    getOrders = () => {
        const {token, handleError} = this.props;
        getOrders(token)
            .then(response => {
                if (!response.errorCode) {
                    this.setState({orders: response})
                } else {
                    handleError(response.message)
                }
            })
            .catch(err => handleError("Сервер не доступен"))
    };

    render() {
        const orderComponents = this.state.orders.map(order =>
            <AdminOrder order={order} refresh={this.getOrders} handleError={this.props.handleError}/>
        );
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Время заказа</th>
                    <th scope="col">Имя пользователя клиента</th>
                    <th scope="col">Название курса</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                {orderComponents}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminOrdersTable);