import React, { useReducer, useEffect } from 'react'
import {Col, Row, Button} from 'react-bootstrap'

import TodoContext from '../context/todo-context'
import todoReducer from '../reducers/todo'
import Instructions from './Instructions'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

const LS_TODO_NAME = 'todo'			// The LocalStorage name


const TodoApp = () => {
	const [todos, dispatch] = useReducer(todoReducer, [])

	// Initial seeding of Todos from localStorage on first run (once) due to empty dependencies
	useEffect(() => {
		const importedTodos = localStorage.getItem(LS_TODO_NAME)
		if (importedTodos) {
			dispatch({type: 'SET_TODOS', todos: JSON.parse(importedTodos)})
		}
	}, [])

	// For actual LocalStorage usage should use this, which updates whenever todos array is modified
	// But once we move to APIs we will need to add API POST/PATCH/DELETE calls to the reducer somehow.
	useEffect(() => {
		localStorage.setItem(LS_TODO_NAME, JSON.stringify(todos))
	}, [todos])

	const handleClearAll = () => {
		// In the API we don't have a /tasks/deleteAll end-point, but here we can do it all at once
		dispatch({type: 'SET_TODOS', todos: []})
	}

	// TodoContext provides the todos and dispatch() to all child components.
	return (
		<TodoContext.Provider value={{todos, dispatch}}>
			<Col>
				{todos.length === 0 && <Instructions /> }
				<AddTodoForm />
				<TodoList />
				<Row className='justify-content-end'>
					<Col xs="2">
						{todos.length > 0 && <Button onClick={handleClearAll}>Clear All</Button>}
					</Col>
				</Row>
			</Col>
		</TodoContext.Provider>
	);
}

export default TodoApp;