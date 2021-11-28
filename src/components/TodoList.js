import React from 'react'
import TodoItem from './TodoItem';

const TodoList = ({todos}) => {
	return (
		<ul>
			{todos.map(item => <TodoItem
				key={item._id}
				todoItem={item}
			/>)}
		</ul>
	);
}

export default TodoList;