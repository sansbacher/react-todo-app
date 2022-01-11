import React, {useState, useContext, useRef, useEffect} from 'react'
import { Form, ListGroup, ListGroupItem, Button, Row, Col } from 'react-bootstrap'
import {Pencil, Trash} from 'react-bootstrap-icons'
import { apiFetch } from 'utils/util'

import AuthContext from 'context/auth-context'
import TodoContext from 'context/todo-context'
import EditTodoModal from './EditTodoModal'

const TodoList = ({setError, deleteTodo}) => {
	const controller = new AbortController()			// To properly cancel the fetch() if the component unmounts
	const {todos, dispatch} = useContext(TodoContext)
	const {auth: {token}} = useContext(AuthContext)				// Double destructure auth.token
	const [modalVisible, setModalVisible] = useState(false)
	const [originalTodo, setOriginalTodo] = useState({})
	const ignoreRef = useRef(false)						// So we don't try to update the Error if it's unmounted

	const closeModal = () => setModalVisible(false)

	const handleEditTodo = (todo) => {
		setOriginalTodo(todo)
		setModalVisible(true)
	}

	const updateTodo = (todo) => {
		setError({present: false})
		ignoreRef.current = false
		// To limit to just the updatable properties: body: JSON.stringify(todo, ['completed', 'description'])		// Send only the Properties allowed to be updated by passing in an array of approved properties (doesn't seem to be required)
		// Was fairly slow if awaiting the API response before updating the UI, so will just assume it works and display an error if it failed
		apiFetch({method: 'PATCH', url: `/tasks/${todo._id}`, controller, token, body: todo})		// Technically, can only update completed + description, but works anyway
			.then(({success, response}) => {
				if (!success && !ignoreRef.current) {
					setError({
						present: true,
						heading: 'ERROR Updating Task!',
						message: `Network error, or try again! ${response.statusText} - ${response.status}`
					})
				}
			})
		dispatch({type: 'UPDATE_TODO', id: todo._id, todo})			// The API returns back the updated todo, but we'll assume it worked and use the passed in data
	}

	// Just return a clean-up function to abort the Fetch if it's in progress as the page changes
	useEffect(() => {
		return () => {
			ignoreRef.current = true
			controller.abort()
		}
	},[])		// eslint-disable-line react-hooks/exhaustive-deps

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
									onChange={() => updateTodo({...todo, completed: !todo.completed})}
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