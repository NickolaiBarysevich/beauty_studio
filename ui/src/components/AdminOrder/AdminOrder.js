import React, {Component} from 'react';
import {approveOrder, cancelOrder} from "../../api/OrderRequests";
import AdminUserView from '../AdminUserView/AdminUserView'
import AdminCourseView from '../AdminCourseView/AdminCourseView'
import {connect} from "react-redux";

class AdminOrder extends Component {

    handleApprove = () => {
        const {token, order, refresh, handleError} = this.props;
        approveOrder(token, order.id, order.course.id)
            .then(response => {
                if (!response.errorCode) {
                    refresh();
                } else {
                    handleError(response.message)
                }
            })
            .catch(err => handleError('Сервер не доступен'))
    };

    handleCancelOrder = () => {
        const {token, order, refresh, handleError} = this.props;
        cancelOrder(token, order.id)
            .then(response => {
                if (!response.errorCode) {
                    refresh();
                } else {
                    handleError(response.message)
                }
            })
            .catch(err => handleError('Сервер не доступен'))
    };

    render() {
        const {order, role} = this.props;
        return (
            <tr>
                <td>{order.id}</td>
                <td>{order.orderTime}</td>
                <td>
                    <a className="dropdown-item" href="#" data-toggle="modal"
                       data-target={"#userOrderView-" + order.customer.id}>{order.customer.username}</a>
                    <AdminUserView user={order.customer} id={"userOrderView-" + order.customer.id}/>
                </td>
                <td>
                    <div>
                        <a className="dropdown-item" href="#" data-toggle="modal"
                           data-target={"#courseOrderView-" + order.course.id}>{order.course.title}</a>
                        <AdminCourseView course={order.course} id={"courseOrderView-" + order.course.id}/>
                    </div>
                </td>
                <td>{order.orderStatus}</td>
                <td>
                    {
                        order.orderStatus === "PROCESSING" && role === "ADMIN"
                            ?
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                <button type="button" onClick={this.handleApprove}
                                        className="btn btn-outline-primary">Зачислить
                                </button>
                                <button type="button" onClick={this.handleCancelOrder}
                                        className="btn btn-outline-danger">Отклонить
                                </button>
                            </div>
                            : ""
                    }
                </td>

            </tr>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminOrder);