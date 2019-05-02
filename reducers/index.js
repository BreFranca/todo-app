import initialState from '../store/initialState';
import { actions } from '../actions/action-types';

const now = () => ((new Date()).getTime());

export default function (state = initialState, action) {
	switch (action.type) {
		case actions.ADD_TODO_FAILURE:
			console.error(action.error);
			return state;

		case actions.ADD_TODO_REQUEST:
			return state;

		case actions.ADD_TODO_SUCCESS:
			return Object.assign({},
				state,
				{
					todos: {
						list: [...state.todos.list, action.data],
						when_fetched: now()
					}
				}
			);

		case actions.FETCH_TODOS_FAILURE:
			console.error(action.error);
			return state;

		case actions.FETCH_TODOS_REQUEST:
			return state;

		case actions.FETCH_TODOS_SUCCESS:
			return Object.assign({},
				state,
				{
					todos: {
						list: action.data,
						when_fetched: now()
					}
				}
			);

		case actions.TOGGLE_FILTER:
			switch (action.name) {
				case 'active':
					return Object.assign({},
						state,
						{
							filter: {
								active: !state.filter.active,
								all: false,
								completed: false
							}
						}
					);

				case 'all':
					return Object.assign({},
						state,
						{
							filter: {
								active: false,
								all: !state.filter.all,
								completed: false
							}
						}
					);

				case 'completed':
					return Object.assign({},
						state,
						{
							filter: {
								active: false,
								all: false,
								completed: !state.filter.completed
							}
						}
					);

				default:
					return state;
			}

		default:
			return state;
	}
}
