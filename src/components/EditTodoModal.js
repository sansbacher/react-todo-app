import React, {useState, useContext} from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { stripHtml } from 'string-strip-html'

import TodoContext from 'context/todo-context'

const EditTodoModal = ({modalVisible, closeModal, originalTodo}) => {
	const {dispatch} = useContext(TodoContext)
	const [newDescription, setNewDescription] = useState(originalTodo.description)
	
	const handleEditTodo = (event) => {
		event && event.preventDefault()
		const description = newDescription ? stripHtml(newDescription).result.trim() : ''
		
		if (description !== '' && description !== originalTodo.description) {
			const newTodo = {...originalTodo, description}
			dispatch({type: 'UPDATE_TODO', id: originalTodo._id, todo: newTodo})
		}
		closeModal()
	}

	// For some reason Chrome took ages to display the Modal (and showed a Warning in the Console: React instrumentation encountered an error: RangeError: Maximum call stack size exceeded)
	// When Animations were enabled. Didn't happen in Firefox, so just disabled animations.
	// Also, under Chrome the Modal now stalls when opened and the Console shows: Uncaught RangeError: Maximum call stack size exceeded, then it works fine. Only happens once. FF, Edge, and Opera are fine.
	return (
		<Modal show={modalVisible} onHide={closeModal} animation={false}>
			<Modal.Header closeButton>
				<Modal.Title>Edit Todo Item</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleEditTodo}>
					<Form.Group>
						<Form.Label>New Task Description:</Form.Label>
						<Form.Control
							autoFocus
							type="text"
							value={newDescription}
							onChange={evt => setNewDescription(evt.target.value)}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button variant="primary" onClick={handleEditTodo}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditTodoModal;