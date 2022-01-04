import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { getCookie, setCookie, apiFetch } from '../utils/util'

import AuthContext from 'context/auth-context'
import Logo from './Logo'
import ErrorAlert from './ErrorAlert'

const LoginPage = () => {
	const rememberedEmail = getCookie('task_manager_email')
	const controller = new AbortController()
	const [formData, setFormData] = useState({ email: rememberedEmail, password: ''})
	const [rememberCheck, setRememberCheck] = useState(!!rememberedEmail)					// Convert rememberedEmail to a bool
	const [error, setError] = useState({present: false, heading: '', message: ''})
	const {setAuth} = useContext(AuthContext)
	const navigate = useNavigate()
	
	// Single event handler for any change to all "text" input fields
	const handleInputChange = (event) => {
		const { name, value } = event.target			// Destructure both the name="XXX" and value from whatever triggered the event
		setFormData({...formData, [name]: value})		// Update the current formData to include the new "name": value
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setError({present: false})
		const {success, response, data} = await apiFetch({method: 'POST', url: '/users/login', body: formData, controller})
		if (success) {
			setCookie('task_manager_auth_token', data.token, 15)
			setAuth({...data})		// Should contain .token and .user
			navigate('/')
		} else {
			setError({
				present: true,
				heading: 'ERROR Logging in!',
				message: `Check email / password and try again! ${response.statusText} - ${response.status}`
			})
		}

		if (rememberCheck) {
			setCookie('task_manager_email', formData.email, 30)
		} else {
			setCookie('task_manager_email', 'deleted', -1)
		}

	}

	// Just return a clean-up function to abort the Fetch if it's in progress as the page changes
	useEffect(() => {
		return () => {
			controller.abort()
		}
	},[])		// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Col md={{ span: 7, offset: 3 }}>
			<Row>
				<Logo message="Login to the React based Todo Task Manager!" />
				{error.present && <ErrorAlert {...error} />}
				<p>If you don't yet have an account you can <Link to="/register">Register here</Link>, otherwise please login:</p>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label><b>Email Address:</b></Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter Email Address"
									autoFocus
									required
									value={formData.email}
									onChange={handleInputChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label><b>Password:</b></Form.Label>
								<Form.Control
									type="password"
									name="password"
									required
									placeholder="Enter Password"
									value={formData.password}
									onChange={handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Check
									type="checkbox"
									label="Remember Me"
									checked={rememberCheck}
									onChange={() => setRememberCheck(!rememberCheck)}
								/>
							</Form.Group>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button variant="primary" type="submit">Login</Button>
						</Col>
					</Row>
				</Form>
			</Row>
		</Col>
	);
}

export default LoginPage;