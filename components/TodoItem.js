import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class TodoItem extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			editTitle: props.todo.title,
			editing: false
		};
	}

	handleChange(event) {
		this.setState({ editTitle: event.target.value });
	}

	handleEdit() {
		this.setState({ editing: true });
	}

	handleKeyDown(event) {
		if (event.key === 'Enter') {
			this.handleSubmit();
		}
	}

	handleSubmit() {
		this.setState({ editing: false });
		this.props.onEdit(this.state.editTitle);
	}

	render() {
		const {
			onDestroy,
			onToggle,
			todo
		} = this.props;

		const {
			editTitle,
			editing
		} = this.state;

		const {
			completed,
			title
		} = todo;

		const handleChange = this.handleChange.bind(this);
		const handleEdit = this.handleEdit.bind(this);
		const handleKeyDown = this.handleKeyDown.bind(this);
		const handleSubmit = this.handleSubmit.bind(this);

		return (
			<li className={classNames({ completed, editing })}>
				<div className='item'>
					{/* <input
						className='toggle'
						type='checkbox'
						checked={completed}
						onChange={onToggle}
					/> */}
					<label onDoubleClick={completed ? null : handleEdit}>
					<span>User: {todo.userId}</span>: - {title}</label>
				</div>
				<input
					ref={(domElement) => { this.editField = domElement; }}
					className='edit'
					value={editTitle}
					onBlur={handleSubmit}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
			</li>
		);
	}
}

TodoItem.propTypes = {
	todo: PropTypes.shape({
		title: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
	}).isRequired,
	onDestroy: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
};
