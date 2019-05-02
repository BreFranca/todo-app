import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Footer from './Footer';
import TodoItem from './TodoItem';

class Main extends React.Component {
	componentDidMount() {
		this.props.fetchTodosIfNeeded();
	}

	render() {
		const {
			activeTodoCount,
			addTodo,
			completedTodoCount,
			completedTodos,
			onClearCompleted,
			onDestroy,
			onEdit,
			onToggle,
			title,
			todos,
			toggleActive,
			toggleAll,
			toggleCompleted
		} = this.props;

		let filter = {
			active: false,
			all: false,
			completed: false,
		};

		const url = this.props.match.url

		switch (url) {
			case '/':
			case '/all':
				filter.all = true;
				break;

			case '/active':
				filter.active = true;
				break;

			case '/completed':
				filter.completed = true;
				break;

			default:
				console.error(`Unhandled path ${url}`);
				filter.all = true;
		}

		return (
			<div>
				<h1>{title}</h1>
				<section className='list'>
					<div>
						<header className='header'>
							<input
								className='new-todo'
								placeholder='Nome da tarefa'
								autoFocus={true}
								onKeyDown={(event) => {
									const target = event.target;
									const title = target.value;
									const key = event.key;
									const userId = 1;

									if ((title !== '') && (key === 'Enter')) {
										addTodo(title, userId);
										target.value = '';
									}
								}}
							/>
						</header>

						<section className='main'>
							<input
								className='toggle-all'
								type='checkbox'
							/>
							<ul className='todo-list'>
								{todos.list
									.filter(({ completed }) => {
										if (filter.completed) return completed;
										if (filter.active) return !completed;
										return true; // filter.all
									})
									.map((todo, i) => (
										<TodoItem key={i}
											onDestroy={onDestroy(todo)}
											onEdit={onEdit(todo)}
											onToggle={onToggle(todo)}
											todo={todo}
										/>
									))
								}
							</ul>
						</section>
						{(activeTodoCount || completedTodoCount) ? (
							<Footer
								activeTodoCount={activeTodoCount}
								completedTodoCount={completedTodoCount}
								filter={filter}
								onClearCompleted={onClearCompleted(completedTodos)}
							/>
						) : null}
					</div>
				</section>
			</div>
		);
	}
}

Main.propTypes = {
	activeTodoCount: PropTypes.number.isRequired,
	addTodo: PropTypes.func.isRequired,
	completedTodoCount: PropTypes.number.isRequired,
	fetchTodosIfNeeded: PropTypes.func.isRequired,
	onClearCompleted: PropTypes.func.isRequired,
	onDestroy: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onToggle: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	todos: PropTypes.shape({
		list: PropTypes.array.isRequired
	}).isRequired
};

Main.defaultProps = {
	activeTodoCount: 0,
	addTodo: Function.prototype,
	completedTodoCount: 0,
	fetchTodosIfNeeded: Function.prototype,
	onClearCompleted: Function.prototype,
	onDestroy: Function.prototype,
	onEdit: Function.prototype,
	onToggle: Function.prototype,
	title: 'Todo list',
	todos: { list: [] }
};

export default withRouter(Main);
