import React from 'react';
import './Courses.css';

const Courses = () => {
    return (
        <section className="courses" id="courses">
            <div className="blur"></div>
            
            <div className="courses_content container">
              <div className="row">
                <div className="col-sm course_item self_makeup">
                  <div className="card" style={{width: "18rem"}}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Название карточки</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Переход куда-нибудь</a>
                    </div>
                  </div>
                </div>

                <div className="col-sm course_item base_makeup">
                  <div className="card" style={{width: "18rem"}}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Название карточки</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Переход куда-нибудь</a>
                    </div>
                  </div>
                </div>

                <div className="col-sm course_item upper_makeup">
                  <div className="card" style={{width: "18rem"}}>
                    <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Название карточки</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="btn btn-primary">Переход куда-нибудь</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </section>
    )
}

export default Courses;