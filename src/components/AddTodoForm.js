import React, {useState, useContext, useEffect, useRef} from 'react'
import {Row, Col, Form, Button} from 'react-bootstrap'
import {PlusLg} from 'react-bootstrap-icons'
import { stripHtml } from 'string-strip-html'
import { apiFetch } from 'utils/util'

import TodoContext from 'context/todo-context'
import AuthContext from 'context/auth-context'

const AddTodoForm = ({setError}) => {
	const controller = new AbortController()			// To properly cancel the fetch() if the component unmounts
	const ignoreRef = useRef(false)						// So we don't try to update the Error if it's unmounted
	const {dispatch} = useContext(TodoContext)
	const {auth: {token}} = useContext(AuthContext)				// Double destructure auth.token
	const [description, setDescription] = useState('')
	
	const handleSubmit = async (evt) => {
		evt.preventDefault()
		setError({present: false})
		const newTodo = {
			description: description ? stripHtml(description).result.trim() : '',
			completed: false
		}
		if (newTodo.description === '') return;

		ignoreRef.current = false
		const {success, response, data} = await apiFetch({method: 'POST', url: '/tasks', controller, token, body: newTodo})
		if (success && !ignoreRef.current) {
			dispatch({type: 'ADD_TODO', todo: data})
			setDescription('')
		} else if (!ignoreRef.current) {
			setError({
				present: true,
				heading: 'ERROR Adding Task!',
				message: `Network error, or try again! ${response.statusText} - ${response.status}`
			})
		}
	}

	// Just return a clean-up function to abort the Fetch if it's in progress as the page changes
	useEffect(() => {
		return () => {
			ignoreRef.current = true
			controller.abort()
		}
	},[])		// eslint-disable-line react-hooks/exhaustive-deps

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