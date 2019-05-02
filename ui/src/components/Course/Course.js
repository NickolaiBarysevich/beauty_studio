// import React, {Component} from 'react';

// class Course extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			clickNumber: 0
// 		}
// 	}

// 	render() {
// 		const {article, isOpen} = this.props;
// 		const body = isOpen && <section className='card-text'>{article.text}</section>;

// 		return (
// 			<div className="col-sm course_item self_makeup">
//         <div className="card" style={{width: "18rem"}}>
//           <img src="..." className="card-img-top" alt="..." />
//           <div className="card-body">
//             <h5 className="card-title">Название карточки</h5>
//             <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//             <a href="#" className="btn btn-primary">Переход куда-нибудь</a>
//           </div>
//         </div>
//       </div>
// 		)
// 	}

// 	clickHandler = () => {
// 		// this.setState({
// 		// 	isOpen: !this.state.isOpen
// 		// })
// 	}
// };

// export default Course;

// // class Course extends Component {
// // 	constructor(props) {
// // 		super(props);

// // 		this.state = {
// // 			clickNumber: 0
// // 		}
// // 	}

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

// // 	clickHandler = () => {
// // 		// this.setState({
// // 		// 	isOpen: !this.state.isOpen
// // 		// })
// // 	}
// // };

// // export default Course;