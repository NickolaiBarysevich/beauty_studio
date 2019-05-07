import React, {Component} from 'react';
import AdminCourses from '../AdminCourses/AdminCourses';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import $ from "jquery";

import './AdminMenu.scss'

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
                            this.state.currentTab === "courses"
                                ? <button className="btn btn-primary">Добавить курс</button>
                                : ""
                        }
                    </div>
                    <div className="col-6">
                        <div className="alert-margin alert alert-danger alert-dismissible fade show courses-alert" role="alert">
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
                        </div>
                    </div>
                </div>

                <div className="row">

                    {
                        this.state.currentTab === "courses"
                            ? <AdminCourses handleError={this.handleError}/>
                            : ""
                    }
                </div>
            </div>
        )
    };
}

export default AdminMenu;