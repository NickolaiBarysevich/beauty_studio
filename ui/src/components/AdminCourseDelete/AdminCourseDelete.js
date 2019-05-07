import React, {Component} from "react"
import {deleteCourse} from "../../api/CourseRequests";
import {connect} from "react-redux";
import $ from 'jquery'

class AdminCourseDelete extends Component {

    state = {
        error: null
    };

    componentDidMount() {
        $(".alert").hide()
    }

    handleDeleteCourse = () => {
        deleteCourse(this.props.courseId, this.props.token)
            .then(response => {
                if (response.status === 200) {
                    this.props.refresh();
                    $(this.props.id).hide();
                    $(document).ready(() => {
                        $('#' + this.props.id).modal('hide');
                    })
                } else {
                    this.setState({error: response.message});
                    $(".alert").show()
                }
            })
            .catch(err => {
                this.setState({error: "Сервер недоступен"});
                $(".alert").show();
            })
    };

    render() {
        return (
            <div className="modal fade" tabIndex="-1" role="dialog" id={this.props.id}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Удаление</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                {this.state.error}
                                <button type="button" className="close" onClick={() => $(".alert").hide()}
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <p>Вы действительно хотите удалить этот курс?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                                    data-dismiss="modal"
                                    data-target={this.props.id}
                                    onClick={this.handleDeleteCourse}>Удалить
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    data-target={this.props.id}>Закрыть
                            </button>
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

export default connect(mapStateToProps)(AdminCourseDelete);