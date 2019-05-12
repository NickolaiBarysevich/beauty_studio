import React, {Component} from 'react';
import {getCourses} from "../../api/CourseRequests";
import Course from '../Course/Course';
import ModalCourseDescription from '../ModalCourseDescription/ModalCourseDescription';

import './Courses.scss';

class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseList: []
        }
    }

    componentWillMount() {
        this.setCourses()
    }

    setCourses = () => {
        getCourses()
            .then(courses => {
                this.setState({courseList: courses});
            });
    };

    render() {
        const courses = this.state.courseList.map((course) =>
            <div className="col-sm" key={course.id}>
                <Course
                    imgUrl={course.imageUrl}
                    title={course.title}
                    description={course.description}
                    id={course.id}
                />
                <ModalCourseDescription currCourse={course} id={"course-description-" + course.id}/>
            </div>
        );

        return (
            <section className="courses" id="courses">
                <div className="courses_content container">
                    <div className="row">
                        {courses}
                    </div>
                </div>
            </section>
        )
    }
}

export default Courses;
