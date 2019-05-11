import React, {Component} from 'react';

import './Course.scss';
import ModalCourseDescription from "../ModalCourseDescription/ModalCourseDescription";

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: null
        }
    }

    render() {
        const {keyName, imgUrl, course} = this.props;

        const cardClassname = "card mb-3 " + keyName;

        const modalId = "modalDescription-" + course.id;

        return (
            <div className={cardClassname} style={{width: "18rem"}}>
                <img src={imgUrl} className="card-img-top" alt={keyName}/>
                <div className="card-body">


                    <ModalCourseDescription course={course} id={modalId}/>



                    <h5 className="card-title">{course.title}</h5>
                    <button className="btn btn-outline-info"
                            data-toggle="modal"
                            data-target={"#" + modalId}>
                        Подробнее
                    </button>
                </div>
            </div>
        )
    }
};

export default Course;

