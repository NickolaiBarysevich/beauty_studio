import React, {Component} from 'react';

import './Course.scss';

class Course extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: null
        }
    }

    render() {
        const {keyName, imgUrl, title, description} = this.props;

        const cardClassname = "card mb-3 " + keyName;

        return (
            <div className={cardClassname} style={{width: "18rem"}}>
                <img src={imgUrl} className="card-img-top" alt={keyName}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <button className="btn btn-primary">Подробнее</button>
                </div>
            </div>
        )
    }
};

export default Course;

