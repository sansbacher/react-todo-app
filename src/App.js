import React, { useState, useEffect } from 'react'

import Instructions from './components/Instructions'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import ClearAllTodos from './components/ClearAllTodos'

function App() {
	const [todos, setTodos] = useState([{
		"completed": false,
		"_id": "5fa8d8ff650501046cd98312",
		"description": "Here is something that needs doing!"
	},
	{
		"completed": true,
		"_id": "abc1230501046cd98312",
		"description": "This one is done"
	}
	])

	return (
		<div className="medium-container">
			<nav><span>REFRESH</span> <span>ABOUT</span></nav>
			<header>
				<h1>React Todo App</h1>
				<p><em>Manage all your have Todo!</em></p>
			</header>
			<div>
				{todos.length === 0 && <Instructions /> }
				<AddTodoForm />
				<TodoList todos={todos} />
				{todos.length > 0 && <ClearAllTodos />}
			</div>
			<footer>
				<p>Source code on Github</p>
			</footer>
		</div>
	);
}

export default App;
