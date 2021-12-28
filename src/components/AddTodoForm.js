import React, {useState, useContext} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {PlusLg} from 'react-bootstrap-icons'
import { stripHtml } from 'string-strip-html'

import TodoContext from '../context/todo-context'

const AddTodoForm = () => {
	const {dispatch} = useContext(TodoContext)
	const [description, setDescription] = useState('')

	const handleSubmit = (evt) => {
		evt.preventDefault()
		const cleanedInput = description ? stripHtml(description).result.trim() : ''
		if (cleanedInput === '') return;
		dispatch({type: 'ADD_TODO', description: cleanedInput})
		setDescription('')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Row className='justify-content-md-center pb-4'>
				<Col xs="10" md="8">
					<Form.Group>
						<Form.Control
							autoFocus
							type="text"
							placeholder="Add something todo..."
							value={description}
							onChange={evt => setDescription(evt.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col xs="1">
					<Button type="submit" aria-label="Add"><PlusLg size={24}/></Button>
				</Col>
			</Row>
		</Form>
	)
}

export default AddTodoForm;