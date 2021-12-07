import React from 'react'
import { stripHtml } from 'string-strip-html'

const TodoList = ({todos, updateTodo, deleteTodo}) => {
	const handleEditTodo = (todo) => {
		// Temporarily using the browser prompt pop-up until adding Bootstrap and a modal
		const input = window.prompt('Edit Todo item', todo.description)
		const description = input ? stripHtml(input).result.trim() : ''
		
		if (description !== '' && description !== todo.description) {
			updateTodo(todo._id, {...todo, description})
		}
	}

	return (
		<ul>
			{todos.map(todo => (
				<li key={todo._id}>
					<input
						type="checkbox"
						checked={todo.completed}
						className="margin-right"
						onChange={() => updateTodo(todo._id, {...todo, completed: !todo.completed})} 
					/>
					<span className={`margin-right ${todo.completed ? 'text-completed' : 'text-not-completed'}`}>{todo.description}</span>
					<button onClick={() => handleEditTodo(todo)}>EDIT</button>
					<button onClick={() => deleteTodo(todo._id)}>DELETE</button>
				</li>
			))}
		</ul>
	);
}

export default TodoList;