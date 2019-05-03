import React, {Component} from 'react';

import {getCourses} from "../../api/CourseRequests";
import Course from '../Course/Course';

import './Courses.scss';

class Courses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseList: null
    }
  }

  setCourses() {
    getCourses(null, false)
      .then(courses => {
          console.log("in promise: ", courses);  //TODO: remove when checked with backend
          this.setState({courseList: courses});

    });
  }

  render() {
    //TODO: remove when checked with backend
    this.setCourses();
    console.log(this.state.courseList);

    return (
      <section className="courses" id="courses">
        <div className="blur"></div>

        <div className="courses_content container">
          <div className="row">
            <Course
              key="self_makeup"
              imgSrc={null}
              title="Макияж для себя"
              description="self-makeup description"
            />

            <Course
              key="base_makeup"
              imgSrc={null}
              title="Базовый курс профессионального макияжа"
              description="base-makeup description"
            />

            <Course
              key="advanced_makeup"
              imgSrc={null}
              title="Повышение квалификации визажистов"
              description="advanced-makeup description"
            />
          </div>
        </div>
      </section>
    )
  }
}

export default Courses;
