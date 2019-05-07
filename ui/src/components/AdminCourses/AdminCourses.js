import React, {Component} from "react"
import AdminCourse from '../AdminCourse/AdminCourse';
import {getCourses} from "../../api/CourseRequests";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'

class AdminCourses extends Component {

    state = {
        courses: []
    };

    componentWillMount() {
        this.getCourses()
    }

    getCourses = () => {
        getCourses()
            .then(response => {
                if (!response.errorCode) {
                    this.setState({courses: response})
                } else {
                    this.props.handleError(response.message);
                }
            })
            .catch(err => this.props.handleError("Сервер недоступен"))
    };

    render() {
        const courses = this.state.courses.map(course =>
            <AdminCourse course={course} refresh={this.getCourses}/>
        );
        return (
            <div className="card-columns">
                {courses}
            </div>
        )
    }
}

export default AdminCourses;