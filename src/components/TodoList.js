import React, {useState} from 'react'
import { Form, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap'
import {Pencil, Trash} from 'react-bootstrap-icons'

import EditTodoModal from './EditTodoModal'

const TodoList = ({todos, updateTodo, deleteTodo}) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [originalTodo, setOriginalTodo] = useState({})

	const closeModal = () => {setModalVisible(false)}

	const handleEditTodo = (todo) => {
		setOriginalTodo(todo)
		setModalVisible(true)
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
									onChange={() => updateTodo(todo._id, {...todo, completed: !todo.completed})}
								/>
							</Col>
							<Col><span className={`${todo.completed ? 'text-completed' : 'text-not-completed'}`}>{todo.description}</span></Col>
							<Col sm={2}>
								<Button aria-label="Edit" className="me-2" onClick={() => handleEditTodo(todo)}><Pencil /></Button>
								<Button aria-label="Delete" onClick={() => deleteTodo(todo._id)}><Trash /></Button>
							</Col>
						</Row>
					</ListGroupItem>
				))}
			</ListGroup>
			{modalVisible && <EditTodoModal modalVisible={modalVisible} closeModal={closeModal} originalTodo={originalTodo} updateTodo={updateTodo} />}
		</div>
	);
}

export default TodoList;