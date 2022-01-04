import React, {useState, useContext} from 'react'
import { Form, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap'
import {Pencil, Trash} from 'react-bootstrap-icons'

import TodoContext from 'context/todo-context'
import EditTodoModal from './EditTodoModal'

const TodoList = () => {
	const {todos, dispatch} = useContext(TodoContext)
	const [modalVisible, setModalVisible] = useState(false)
	const [originalTodo, setOriginalTodo] = useState({})

	const closeModal = () => setModalVisible(false)

	const handleEditTodo = (todo) => {
		setOriginalTodo(todo)
		setModalVisible(true)
	}

	const handleCheckTodo = (todo) => {
		const newTodo = {...todo, completed: !todo.completed}
		dispatch({type: 'UPDATE_TODO', id: todo._id, todo: newTodo})
	}

	// The Modal needs the visible && <Modal> guard even though it has a show={visible} since it will not have the other props available if it's added to the DOM (but invisible) before a todo is selected to be edited
	return (
		<div>
			<ListGroup variant='flush' className='mb-2'>
				{todos.map(todo => (
					<ListGroupItem key={todo._id}>
						<Row>
							<Col sm={1}>
								<Form.Check
									checked={todo.completed}
									onChange={() => handleCheckTodo(todo)}
								/>
							</Col>
							<Col><span className={`${todo.completed ? 'text-completed' : 'text-not-completed'}`}>{todo.description}</span></Col>
							<Col sm={2}>
								<Button aria-label="Edit" className="me-2" onClick={() => handleEditTodo(todo)}><Pencil /></Button>
								<Button aria-label="Delete" onClick={() => dispatch({type: 'DELETE_TODO', id: todo._id})}><Trash /></Button>
							</Col>
						</Row>
					</ListGroupItem>
				))}
			</ListGroup>
			{modalVisible && <EditTodoModal modalVisible={modalVisible} closeModal={closeModal} originalTodo={originalTodo} />}
		</div>
	);
}

export default TodoList;