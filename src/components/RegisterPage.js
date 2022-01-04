import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { setCookie, apiFetch } from '../utils/util'

import AuthContext from 'context/auth-context'
import Logo from './Logo'
import ErrorAlert from './ErrorAlert'

const RegisterPage = () => {
	const controller = new AbortController()
	const [formData, setFormData] = useState({ name: '', email: '', password: '', age: ''})
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
		const {success, response, data} = await apiFetch({method: 'POST', url: '/users', body: formData, controller})
		if (success) {
			setCookie('task_manager_auth_token', data.token, 15)
			setAuth({...data})		// Should contain .token and .user
			navigate('/')
		} else {
			// Unfortunately the API, as written, is very uninformative of what the problem is...
			setError({
				present: true,
				heading: 'ERROR Creating new user!',
				message: `Check name / email / password and try again! ${response.statusText} - ${response.status}`
			})
		}
	}

	// Just return a clean-up function to abort the Fetch if it's in progress if the page changes
	useEffect(() => {
		return () => {
			controller.abort()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	return (
		<Col md={{ span: 7, offset: 3 }}>
			<Row>
				<Logo message="Login to the React based Todo Task Manager!" />
				{error.present && <ErrorAlert {...error} />}
				<p>If you already have an account you can <Link to="/login">Login here</Link>, otherwise please register:</p>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Label><b>Name:*</b></Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder="Enter your Name"
									autoFocus
									required
									value={formData.name}
									onChange={handleInputChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label><b>Email Address:*</b></Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter your Email Address"
									required
									value={formData.email}
									onChange={handleInputChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label><b>Password:*</b></Form.Label>
								<Form.Control
									type="password"
									name="password"
									required
									placeholder="Choose a Password"
									value={formData.password}
									onChange={handleInputChange}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label><b>Age:</b></Form.Label>
								<Form.Control
									type="number"
									name="age"
									placeholder="Optionally enter your Age"
									value={formData.age}
									onChange={handleInputChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<p>*Required</p>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button variant="primary" type="submit">Register</Button>
						</Col>
					</Row>
				</Form>
			</Row>
		</Col>
	);
}

export default RegisterPage;