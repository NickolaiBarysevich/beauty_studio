import React, {Component} from 'react';
// import {getCourses} from "../../api/CourseRequests";
import Course from '../Course/Course';

import './Courses.scss';

class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseList: null
        }
    }


    // componentWillMount() {
    //     this.setCourses()
    // }

    // setCourses = () => {
    //     getCourses(null, false)
    //         .then(courses => {
    //             console.log("in promise: ", courses);  //TODO: remove when checked with backend
    //             this.setState({courseList: courses});
    //
    //         });
    // };


    render() {
        return (
            <section className="courses" id="courses">
                <div className="blur"></div>

                <div className="courses_content container">
                    <div className="row">
                        <div className="col-sm">
                            <Course
                                keyName="self_makeup"
                                imgUrl="https://i.ytimg.com/vi/WZerlq1RYUQ/maxresdefault.jpg"
                                title={"Базовый курс \"Сам себе визажист\""}
                                description="self-makeup description"
                            />
                        </div>

                        <div className="col-sm">
                            <Course
                                keyName="base_makeup"
                                imgUrl="https://i.ytimg.com/vi/WZerlq1RYUQ/maxresdefault.jpg"
                                title="Базовый курс профессионального макияжа"
                                description="base-makeup description"
                            />
                        </div>

                        <div className="col-sm">
                            <Course
                                keyName="advanced_makeup"
                                imgUrl="https://i.ytimg.com/vi/WZerlq1RYUQ/maxresdefault.jpg"
                                title="Повышение квалификации визажистов"
                                description="advanced-makeup description"
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Courses;
