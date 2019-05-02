import fetch from 'isomorphic-fetch';
import { actions } from './action-types';

const URL = 'https://jsonplaceholder.typicode.com/todos';

const headersJSON = () => ({
	'Accept': 'application/json',
	'Content-Type': 'application/json'
});

const checkStatus = (response) => {
	if (response.ok) {
		return response;
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function addTodo(todo) {
	return dispatch => {
		dispatch({ type: actions.ADD_TODO_REQUEST });

		const headers = headersJSON();
		const endpoint = `${URL}`;
		const method = 'POST';
		const body = JSON.stringify(todo);

		return fetch(endpoint, { method, headers, body })
			.then(checkStatus)
			.then(response => response.json())
			.then(data => {
				dispatch({ data, type: actions.ADD_TODO_SUCCESS });
			})
			.catch(error => {
				dispatch({ error, type: actions.ADD_TODO_FAILURE });
			});
	}
}

function fetchTodos() {
	return dispatch => {
		dispatch({ type: 'FETCH_TODOS_REQUEST' });

		const headers = headersJSON();
		const endpoint = `${URL}`;

		return fetch(endpoint, { headers })
			.then(checkStatus)
			.then(response => response.json())
			.then(data => {
				dispatch({ data, type: actions.FETCH_TODOS_SUCCESS });
			})
			.catch(error => {
				dispatch({ error, type: actions.FETCH_TODOS_FAILURE });
			})
	}
}

export function fetchTodosIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchTodos(getState())) {
			return dispatch(fetchTodos());
		}
	}
}

function shouldFetchTodos({ todos }) {
	return todos.when_fetched === null;
}

export function toggleFilter(name) {
	return {
		type: actions.TOGGLE_FILTER,
		name
	};
}
