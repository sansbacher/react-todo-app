import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import Instructions from './components/Instructions'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'

function App() {
	const [todos, setTodos] = useState([])

	const updateTodo = (id, updatedTodo) => {
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
