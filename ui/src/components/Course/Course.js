import React, {Component} from 'react';

class Course extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: null
		}
	}

	render() {
		const {key, imgSrc, title, description} = this.props;

		const cardClassname = "col-sm course_item " + key;

		return (
			<div className={cardClassname}>
				<div className="card" style={{width: "18rem"}}>
					<img src={imgSrc} className="card-img-top" alt={title} />
					<div className="card-body">
						<h5 className="card-title">{title}</h5>
						<p className="card-text">{description}</p>
						<a href="#" className="btn btn-primary">Подробнее</a>
					</div>
				</div>
			</div>
		)
	}

	// clickHandler = () => {
	// 	this.setState({
	// 		isOpen: !this.state.isOpen
	// 	})
	// }
};

export default Course;


// // 	render() {
// // 		const {article, isOpen} = this.props;
// // 		const body = isOpen && <section className='card-text'>{article.text}</section>;

// // 		return (
// // 			<div className='card mx-auto' style={{width: '50%'}}>
// // 				<div className='card-header'>
// // 					<h2 onClick={this.incrementClick}>
// // 					{article.title}
// // 					clicked {this.state.clickNumber}
// // 					</h2>
// // 					<button onClick={this.clickHandler} className='btn btn-primary btn-sm float-right'>
// // 						{isOpen ? 'close' : 'open'}
// // 					</button>
// // 				</div>
// // 				<div className='card-body'>
// // 					{body}
// // 				</div>
// // 			</div>
// // 		)
// // 	}

