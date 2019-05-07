import React, {Component} from "react"
import {AvField, AvForm} from "availity-reactstrap-validation";
import {updateCourse} from "../../api/CourseRequests";
import {connect} from "react-redux";
import $ from 'jquery'

class AdminCourseEdit extends Component {

    state = {
        id: this.props.course.id,
        title: this.props.course.title,
        description: this.props.course.description,
        participantsNumber: this.props.course.participantsNumber,
        startDate: this.props.course.startDate,
        endDate: this.props.course.endDate,
        lessonsAmount: this.props.course.lessonsAmount,
        price: this.props.course.price,
        teacher: this.props.course.teacher,
        imageUrl: this.props.course.imageUrl,

        error: null
    };

    componentDidMount() {
        $(".alert").hide()
    }

    handleUpdateCourse = () => {
        console.log(this.state);
        updateCourse(this.state, this.props.token)
            .then(response => {
                if (!response.errorCode) {
                    this.props.refresh();
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
                <AvForm onValidSubmit={this.handleUpdateCourse}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Курс</h5>
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
                                <AvField
                                    name="title"
                                    label="Название"
                                    type="text"
                                    value={this.state.title}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                    }}
                                    onChange={event => {
                                        const title = event.target.value;
                                        this.setState({
                                            title: title,
                                        });

                                    }}/>
                                <AvField
                                    name="description"
                                    label="Описание"
                                    type="textarea"
                                    value={this.state.description}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                    }}
                                    onChange={event => {
                                        const description = event.target.value;
                                        this.setState({
                                            description: description,
                                        });

                                    }}/>
                                <AvField
                                    name="places"
                                    label="Количество мест"
                                    value={this.state.participantsNumber}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                        number: {
                                            value: true,
                                            errorMessage: "Количество мест должно быть положительным числом"
                                        },
                                        min: {
                                            value: 1,
                                            errorMessage: "Количество мест должно быть положительным числом"
                                        }
                                    }}
                                    onChange={event => {
                                        const participantsNumber = event.target.value;
                                        this.setState({
                                            participantsNumber: participantsNumber,
                                        });
                                    }}/>
                                <AvField
                                    name="startDate"
                                    label="Начало курса"
                                    value={this.state.startDate}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                        date: {format: 'YYYY-MM-DD', errorMessage: "Формат даты должен быть гггг-мм-дд"}
                                    }}
                                    onChange={event => {
                                        const startDate = event.target.value;
                                        this.setState({
                                            startDate: startDate,
                                        });
                                    }}/>
                                <AvField
                                    name="endDate"
                                    label="Конец курса"
                                    value={this.state.endDate}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                        date: {format: 'YYYY-MM-DD', errorMessage: "Формат даты должен быть гггг-мм-дд"},
                                        dateRange: {
                                            format: 'YYYY-MM-DD',
                                            start: {value: this.state.startDate},
                                            end: {value: '2070-01-01'},
                                            errorMessage: "Дата конца курса не может идти раньше чем начало"
                                        }
                                    }}
                                    onChange={event => {
                                        const endDate = event.target.value;
                                        this.setState({
                                            endDate: endDate,
                                        });
                                    }}/>
                                <AvField
                                    name="lessons"
                                    label="Количество занятий"
                                    value={this.state.lessonsAmount}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                        number: {
                                            value: true,
                                            errorMessage: "Количество мест должно быть положительным числом"
                                        },
                                        min: {
                                            value: 1,
                                            errorMessage: "Количество мест должно быть положительным числом"
                                        }
                                    }}
                                    onChange={event => {
                                        const lessonsAmount = event.target.value;
                                        this.setState({
                                            lessonsAmount: lessonsAmount,
                                        });
                                    }}/>
                                <AvField
                                    name="price"
                                    label="Цена"
                                    value={this.state.price}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                        pattern: {
                                            value: "^\\d{1,6}(\\.\\d{1,2})?$",
                                            errorMessage: "Цена должна быть положительным числом"
                                        },
                                    }}
                                    onChange={event => {
                                        const price = event.target.value;
                                        this.setState({
                                            price: price,
                                        });

                                    }}/>
                                <AvField
                                    name="imageUrl"
                                    label="Изображение для курса"
                                    type="text"
                                    value={this.state.imageUrl}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                    }}
                                    onChange={event => {
                                        const imageUrl = event.target.value;
                                        this.setState({
                                            imageUrl: imageUrl,
                                        });

                                    }}/>
                                <AvField
                                    name="teacherUsername"
                                    label="Имя пользователя учителя"
                                    type="text"
                                    value={this.state.teacher}
                                    validate={{
                                        required: {value: true, errorMessage: "Обязателное поле"},
                                    }}
                                    onChange={event => {
                                        const teacher = event.target.value;
                                        this.setState({
                                            teacher: teacher,
                                        });

                                    }}/>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-warning">
                                    Редактировать
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                        data-target={this.props.id}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </AvForm>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.authorizationReducer
});

export default connect(mapStateToProps)(AdminCourseEdit);