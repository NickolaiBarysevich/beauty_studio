import React, {Component} from 'react';
import AdminCourses from '../AdminCourses/AdminCourses';
import AdminCourseAdd from '../AdminCourseAdd/AdminCourseAdd'
import AdminOrdersTable from '../AdminOrdersTable/AdminOrdersTable'
import AdminUsers from '../AdminUsers/AdminUsers'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import $ from "jquery";

import './AdminMenu.scss'
import {connect} from "react-redux";

class AdminMenu extends Component {

    state = {
        currentTab: "courses"
    };

    componentDidMount() {
        $(".alert").hide()
    }

    handleError = error => {
        this.setState({error: error});
        $(".alert").show()
    };

    render() {
        return (
            <div className="container">
                <div className="row control-panel">
                    <div className="col">
                        {
                            this.props.role === "ADMIN"
                                ? <AdminCourseAdd/>
                                : ""
                        }
                        {
                            this.state.currentTab === "courses" && this.props.role === "ADMIN"
                                ? <button type="button" className="btn btn-primary" data-dismiss="modal"
                                          onClick={() => $(document).ready(function () {
                                              $('#courseAddModal').modal('show');
                                          })}>Добавить курс</button>
                                : ""
                        }
                    </div>
                    <div className="col-6">
                        <div className="alert-margin alert alert-danger alert-dismissible fade show courses-alert"
                             role="alert">
                            {this.state.error}
                            <button type="button" className="close" onClick={() => $(".alert").hide()}
                                    aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                onClick={() => this.setState({currentTab: "courses"})}
                                className={this.state.currentTab === "courses" ? "btn btn-outline-info active" : "btn btn-outline-info"}>Курсы
                            </button>
                            <button
                                type="button"
                                onClick={() => this.setState({currentTab: "orders"})}
                                className={this.state.currentTab === "orders" ? "btn btn-outline-info active" : "btn btn-outline-info"}>Заказы
                            </button>
                            {
                                this.props.role === "ADMIN"
                                    ? <button
                                        type="button"
                                        onClick={() => this.setState({currentTab: "clients"})}
                                        className={this.state.currentTab === "clients" ? "btn btn-outline-info active" : "btn btn-outline-info"}>Клиенты
                                    </button>
                                    : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="row">
                    {
                        this.state.currentTab === "courses"
                            ? <AdminCourses handleError={this.handleError}/>
                            :
                            this.state.currentTab === "orders"
                                ? <AdminOrdersTable handleError={this.handleError}/>
                                : <AdminUsers handleError={this.handleError}/>
                    }
                </div>
            </div>
        )
    };
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminMenu);