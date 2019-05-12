import React, {Component} from 'react';
import reactHtmlParser from 'react-html-parser';
import './ModalCourseDescription.scss';
import {createOrder} from "../../api/OrderRequests";
import {connect} from "react-redux";
import $ from "jquery";

class ModalCourseDescription extends Component {

    state = {
        logged: false,
        subscribed: false
    };

    componentDidMount() {
        $("#descr-alert-" + this.props.id).hide();
    }

    handleCreateOrder = () => {
        const {currCourse, id, token} = this.props;
        if (token) {
            createOrder(token, currCourse.id)
                .then(response => {
                    if (!response.errorCode) {
                        this.setState({logged: true});
                        $("#descr-alert-" + id).show();
                    } else if (response.errorCode === 400) {
                        this.setState({subscribed: true});
                        $("#descr-alert-" + id).show();
                    } else {
                        throw response.message;
                    }
                })
                .catch(reason => console.log(reason))
        } else {
            $("#descr-alert-" + id).show();
        }
    };

    render() {
        const {currCourse, id, showSubscribe} = this.props;
        return (
            <div className="modal fade course-descr" id={id} tabIndex="-1" role="dialog"
                 aria-labelledby="course-description" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content course-descr-content">
                        <div className="modal-header course-descr-header">
                            <h5 className="modal-title" id="exampleModalLabel">{currCourse.title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => $("#descr-alert-" + id).hide()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body course-descr-body">
                            {reactHtmlParser(currCourse.description)}
                            <div className="alert-margin alert alert-info alert-dismissible fade show courses-alert"
                                 id={"descr-alert-" + id} role="alert">
                                {
                                    this.state.subscribed
                                        ? <span>Вы уже подали заявку на этот курс.</span>
                                        :
                                        this.state.logged
                                            ? <span>Вы записаны! Проверьте личный кабинет.</span>
                                            : <span>Войдите в систему, чтобы записаться</span>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={() => $("#descr-alert-" + id).hide()}>Закрыть
                            </button>
                            {
                                showSubscribe
                                    ? <button type="button" className="btn btn-outline-info"
                                              onClick={this.handleCreateOrder}>Записаться</button>
                                    : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(ModalCourseDescription);
