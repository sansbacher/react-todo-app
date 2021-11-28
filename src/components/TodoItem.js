import React from 'react'

const TodoItem = ({ todoItem }) => {
	const {completed, description} = todoItem

	return (
		<li>
			<form>
				<input type="checkbox" checked={completed} />
				<span>{description}</span>
				<button>EDIT</button>
				<button>DELETE</button>
			</form>
		</li>
	);
}


export default TodoItem;