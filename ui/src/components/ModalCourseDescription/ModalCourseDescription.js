import React from 'react';

import './ModalCourseDescription.scss';

const ModalCourseDescription = () => {
    const {currCourse, id} = this.props;

    return (
        <div className="modal fade course-descr" id={id} tabIndex="-1" role="dialog"
             aria-labelledby="course-description" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content course-descr-content">
                    <div className="modal-header course-descr-header">
                        <h5 className="modal-title" id="exampleModalLabel">{currCourse.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body course-descr-body">
                        {currCourse.description}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                        <button type="button" className="btn btn-outline-info">Записаться</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalCourseDescription;