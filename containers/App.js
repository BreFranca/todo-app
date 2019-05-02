import Main from '../components/Main'
import { connect } from 'react-redux'
import {
	addTodo,
	deleteTodo,
	editTodo,
	fetchTodosIfNeeded,
	toggleTodo,
} from '../actions'

const mapStateToProps = (state, ownProps) => {
	const todosList = state.todos.list;

	const activeTodoCount = todosList.reduce((accum, todo) => {
		return todo.completed ? accum : accum + 1;
	}, 0);

	const completedTodos = todosList.filter(({ completed }) => completed);

	return Object.assign({}, state, {
		activeTodoCount,
		completedTodoCount: todosList.length - activeTodoCount,
		completedTodos,
	})
}

const mapDispatchToProps = dispatch => {
	return {
		addTodo(title, userId) {
			dispatch(addTodo({ title, userId, completed: true }));
		},
		fetchTodosIfNeeded() {
			dispatch(fetchTodosIfNeeded());
		},
		onClearCompleted(todos) {
			return function () {
				todos.forEach(todo => dispatch(deleteTodo(todo)));
			}
		},
		onDestroy(todo) {
			return function () {
				dispatch(deleteTodo(todo))
			}
		},
		onEdit(todo) {
			return function (title) {
				dispatch(editTodo(todo, title))
			}
		},
		onToggle(todo) {
			return function () {
				dispatch(toggleTodo(todo))
			}
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
