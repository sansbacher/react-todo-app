import React, { useState, useReducer, useEffect, useContext, useRef } from 'react'
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
	const controller = new AbortController()					// To properly cancel the fetch() if the component unmounts
	const {auth: {token}} = useContext(AuthContext)				// Double destructure auth.token
	const [todos, dispatch] = useReducer(todoReducer, [])
	const ignoreRef = useRef(false)								// So we don't try to update the Error if it's unmounted
	const [isLoading, setIsLoading] = useState(true)			// Because we start loading via useEffect on initial render
	const [error, setError] = useState({present: false, heading: '', message: ''})

	// Initial seeding of Todos from API on first run (once) due to empty dependencies
	useEffect(() => {
		async function fetchInitialData() {
			setIsLoading(true)
			setError({present: false})
			ignoreRef.current = false
			const {success, response, data} = await apiFetch({method: 'GET', url: '/tasks', controller, token})
			if (success && !ignoreRef.current) {
				dispatch({type: 'SET_TODOS', todos: data})
				setIsLoading(false)
			} else if (!ignoreRef.current) {
				setError({
					present: true,
					heading: 'ERROR Loading Tasks!',
					message: `Network Error or Logout/Login and try again! ${response.statusText} - ${response.status}`
				})
			}
		}
		fetchInitialData()
		
		// Return a clean-up function to abort any Fetch if it's in progress as the page changes
		return () => {
			ignoreRef.current = true
			controller.abort()
		}
	}, [])								// eslint-disable-line react-hooks/exhaustive-deps

	const deleteTodo = async (id) => {
		setError({present: false})
		ignoreRef.current = false
		apiFetch({method: 'DELETE', url: `/tasks/${id}`, controller, token})
			.then(({success, response}) => {
				if (!success && !ignoreRef.current) {
					setError({
						present: true,
						heading: 'ERROR Deleting Task!',
						message: `Network error, or try again! ${response.statusText} - ${response.status}`
					})
				}
			})
		dispatch({type: 'DELETE_TODO', id})			// The API returns back the deleted todo, but we'll assume it worked and use the passed in data right away
	}

	const handleClearAll = () => {
		// In the API we don't have a /tasks/deleteAll end-point, so we must do them one at a time
		// We could either re-write deleteTodo() to fetch(DELETE) each Task and then: dispatch({type: 'SET_TODOS', todos: []})
		// Or we can just use it as is, and not wait for the result since it doesn't block:
		todos.forEach(todo => deleteTodo(todo._id))
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
						<TodoList setError={setError} deleteTodo={deleteTodo} />
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