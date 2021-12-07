import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import Instructions from './components/Instructions'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'

const LS_TODO_NAME = 'todo'			// The LocalStorage name

function App() {
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
		<div className="medium-container">
			<nav><span>ABOUT</span></nav>
			<header>
				<h1>React Todo App</h1>
				<p><em>Manage all your have Todo!</em></p>
			</header>
			<div>
				{todos.length === 0 && <Instructions /> }
				<AddTodoForm addTodo={addTodo} />
				<TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
				{todos.length > 0 && <button onClick={handleClearAll} >Clear All</button>}
			</div>
			<footer>
				<p>Source code on Github</p>
			</footer>
		</div>
	);
}

export default App;
