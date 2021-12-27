import React, {useState} from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { stripHtml } from 'string-strip-html'

const EditTodoModal = (props) => {
	const {originalTodo} = props
	const [newDescription, setNewDescription] = useState(originalTodo.description)
	
	const handleEditTodo = (event) => {
		event && event.preventDefault()
		const description = newDescription ? stripHtml(newDescription).result.trim() : ''
		
		if (description !== '' && description !== originalTodo.description) {
			props.updateTodo(originalTodo._id, {...originalTodo, description})
		}
		props.closeModal()
	}

	// For some reason Chrome took ages to display the Modal (and showed a Warning in the Console: React instrumentation encountered an error: RangeError: Maximum call stack size exceeded)
	// When Animations were enabled. Didn't happen in Firefox, so just disabled animations.
	return (
		<Modal show={props.modalVisible} onHide={props.closeModal} animation={false}>
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
				<Button variant="secondary" onClick={props.closeModal}>
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