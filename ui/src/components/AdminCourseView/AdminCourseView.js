import React from "react"
import AdminCourseParticipants from '../AdminCourseParticipants/AdminCourseParticipants'
import ReactHtmlParser from 'react-html-parser';

const AdminCourseView = ({course, id}) => {
    return (
        <div className="modal fade" tabIndex="-1" role="dialog" id={id}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Курс</h5>
                        <button type="button" className="close" data-dismiss="modal" data-target={id} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Номер: {course.id}</p>
                        <p>Название: {course.title}</p>
                        <p>Описание: {ReactHtmlParser(course.description)}</p>
                        <p>Количество мест: {course.participantsNumber}</p>
                        <p>Начало курса: {course.startDate}</p>
                        <p>Конец курса: {course.endDate}</p>
                        <p>Количество занятий: {course.lessonsAmount}</p>
                        <p>Цена: {course.price}</p>
                        <p>Преподаватель: {course.teacher.username ? course.teacher.username : course.teacher}</p>
                        <p><AdminCourseParticipants participants={course.participants} /></p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                data-target={id}>Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminCourseView;