import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteOrder} from "../../api/OrderRequests";
import ModalCourseDescription from "../ModalCourseDescription/ModalCourseDescription"

class UserOrder extends Component {

    handleDeleteOrder = () => {
        const {order, token, refresh, handleError} = this.props;
        deleteOrder(order.id, token)
            .then(response => {
                if (response.status === 200) {
                    refresh();
                } else {
                    handleError(response.message)
                }
            })
            .catch(err => handleError("Сервер недоступен"))
    };

    defineOrderStatus = order => {
        const status = order.orderStatus;
        const startDate = order.course.startDate;
        const endDate = order.course.endDate;

        if (status === "APPROVED" && new Date() > new Date(endDate))
            return "Курс завершён";
        else if (status === "APPROVED" && new Date() >= new Date(startDate))
            return "Курс начался";
        else if (status === "APPROVED" && new Date() < new Date(startDate))
            return "Курс скоро начнется";
        else if (status === "PROCESSING")
            return "Заявка на курс обрабатывается";
        else
            return "Заявка на курс отклонена";
    };

    render() {
        const {order} = this.props;
        return (
            <tr>
                <td>{order.orderTime}</td>
                <td>
                    <div>
                        <a className="dropdown-item" href="#" data-toggle="modal"
                           data-target={"#courseDescr-" + order.id}>{order.course.title}</a>
                        <ModalCourseDescription currCourse={order.course} id={"courseDescr-" + order.id} />
                    </div>
                </td>
                <td>{this.defineOrderStatus(order)}</td>
                <td>
                    {
                        order.orderStatus === "PROCESSING"
                            ?
                            <button type="button" onClick={this.handleDeleteOrder}
                                    className="btn btn-outline-danger">Отменить заявку
                            </button>
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

export default connect(mapStateToProps)(UserOrder);