// import { v4 as uuid } from 'uuid'			// The ._id comes back from the API

// Reducer returns new state based on the passed in current state and the action object (which has any other payload properties on it)
const todoReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return action.todos;
		case 'UPDATE_TODO':
			return state.map(item => item._id !== action.id ? item : action.todo);		// Sets every todo to itself or the updatedTodo
		case 'ADD_TODO':
			// return [...state, { _id: uuid(), description: action.description, completed: false }]
			return [...state, action.todo]
		case 'DELETE_TODO':
			return state.filter(todo => todo._id !== action.id);
		default:
			console.log(`WARNING! Unknown dispatch action: ${action.type}`)				// eslint-disable-line no-console
			return state;
	}
}

export {todoReducer as default};