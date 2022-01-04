import React, { useState, useReducer, useEffect, useContext } from 'react'
import {Col, Row, Button} from 'react-bootstrap'
import { apiFetch } from 'utils/util'

import AuthContext from 'context/auth-context'
import TodoContext from 'context/todo-context'
import todoReducer from 'reducers/todo'
import ErrorAlert from 'components/ErrorAlert'
import Logo, {Italics} from './Logo'
import AddTodoForm from './AddTodoForm'
import TodoList from './TodoList'


const TodoApp = () => {
	const {auth} = useContext(AuthContext)
	const [todos, dispatch] = useReducer(todoReducer, [])
	const [isLoading, setIsLoading] = useState(true)			// Because we start loading via useEffect on initial render
	const [error, setError] = useState({present: false, heading: '', message: ''})

	// Initial seeding of Todos from API on first run (once) due to empty dependencies
	useEffect(() => {
		const controller = new AbortController()			// To properly cancel the fetch() if the component unmounts
		let ignore = false									// So we don't try to update the Error if it's unmounted

		async function fetchInitialData() {
			setIsLoading(true)
			setError({present: false})
			const {success, response, data} = await apiFetch({method: 'GET', url: '/tasks', controller, token: auth.token})
			if (success) {
				dispatch({type: 'SET_TODOS', todos: data})
				setIsLoading(false)
			} else {
				if (!ignore) {
					setError({
						present: true,
						heading: 'ERROR Loading Tasks!',
						message: `Network Error or Logout/Login and try again! ${response.statusText} - ${response.status}`
					})
				}
			}
		}
		fetchInitialData()
		
		// Return a clean-up function to abort the Fetch if it's in progress as the page changes
		return () => {
			ignore = true
			controller.abort()
		}
	}, [])								// eslint-disable-line react-hooks/exhaustive-deps

	const handleClearAll = () => {
		// In the API we don't have a /tasks/deleteAll end-point, but here we can do it all at once
		dispatch({type: 'SET_TODOS', todos: []})
	}

	// TodoContext provides the todos and dispatch() to all child components.
	return (
		<TodoContext.Provider value={{todos, dispatch}}>
			<Col>
				{error.present && <ErrorAlert {...error} />}
				{isLoading ? (
					<Logo message="Please wait. Loading..." Flair={Italics} />
				) : (
					<>
						{todos.length === 0 && <Logo message="Enter anything you need to do, when you're done check it off!" /> }
						
						<AddTodoForm setError={setError} />
						<TodoList />
						<Row className='justify-content-end'>
							<Col xs="2">
								{todos.length > 0 && <Button onClick={handleClearAll}>Clear All</Button>}
							</Col>
						</Row>
					</>
				)}
			</Col>
		</TodoContext.Provider>
	);
}

export default TodoApp;