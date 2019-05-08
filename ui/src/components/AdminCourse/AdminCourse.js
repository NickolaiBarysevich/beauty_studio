import React, {Component} from "react";
import AdminCourseView from '../AdminCourseView/AdminCourseView';
import AdminCourseEdit from '../AdminCourseEdit/AdminCourseEdit';
import AdminCourseDelete from '../AdminCourseDelete/AdminCourseDelete'
import './AdminCourse.scss'
import {connect} from "react-redux";

class AdminCourse extends Component {

    render() {
        const {course, role} = this.props;
        return (
            <div className="card">
                <img src={course.imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">Начало: {course.startDate}</p>
                    <p className="card-text">Конец: {course.endDate}</p>
                    <p className="card-text">Цена: {course.price} рублей</p>
                </div>
                <div className="card-footer">
                    <AdminCourseView course={course} id={"courseViewModal-" + course.id}/>
                    <AdminCourseEdit course={course} id={"courseEditModal-" + course.id} refresh={this.props.refresh}/>
                    <AdminCourseDelete courseId={course.id} id={"courseDeleteModal-" + course.id}
                                       refresh={this.props.refresh}/>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-outline-success" data-toggle="modal"
                                data-target={"#courseViewModal-" + course.id}>Подробнее
                        </button>
                        {
                            role === "ADMIN"
                                ? <button type="button" className="btn btn-outline-warning" data-toggle="modal"
                                          data-target={"#courseEditModal-" + course.id}>Редактировать
                                </button>
                                : ""
                        }
                        {
                            role === "ADMIN"
                                ? <button type="button" className="btn btn-outline-danger" data-toggle="modal"
                                          data-target={"#courseDeleteModal-" + course.id}>Удалить
                                </button>
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
export default connect(mapStateToProps)(AdminCourse);