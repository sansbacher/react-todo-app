import React, { useState, useEffect } from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

import Instructions from './Instructions'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'

const LS_TODO_NAME = 'todo'			// The LocalStorage name


const TodoApp = () => {
	const [todos, setTodos] = useState([])
	// Initial seeding of Todos from localStorage on first run (once) due to empty dependencies
	useEffect(() => {
		const importedTodos = localStorage.getItem(LS_TODO_NAME)
		if (importedTodos) {
			setTodos(JSON.parse(importedTodos))
		}
	}, [])

	// For actual LocalStorage usage should use this, which updates whenever todos array is modified
	// But once we move to APIs we will need to add API POST/PATCH/DELETE calls in the functions below
	useEffect(() => {
		localStorage.setItem(LS_TODO_NAME, JSON.stringify(todos))
	}, [todos])

	const updateTodo = (id, updatedTodo) => {
		// Should not change/mutate the current state, just return an all new copy of the state
		setTodos(todos.map(todo => todo._id !== id ? todo : updatedTodo))		// Sets every todo to itself or the updatedTodo
	}

	const addTodo = (description) => {
		setTodos([...todos, { _id: uuid(), description, completed: false }])
	}
	
	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo._id !== id))
	}

	const handleClearAll = () => {
		// In the API we don't have a /tasks/deleteAll end-point, but here we can do it all at once
		setTodos([])
	}

	return (
		<Col>
			{todos.length === 0 && <Instructions /> }
			<AddTodoForm addTodo={addTodo} />
			<TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
			<Row className='justify-content-end'>
				<Col xs="2">{todos.length > 0 && <Button className="" onClick={handleClearAll}>Clear All</Button>}</Col>
			</Row>
		</Col>
	);
}

export default TodoApp;