import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Logo from './Logo'

const LoginPage = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({ email: '', password: ''})
	const [rememberCheck, setRememberCheck] = useState(false)
	

	// Single event handler for any change to all "text" input fields
	const handleInputChange = (event) => {
		const { name, value } = event.target			// Destructure both the name="XXX" and value from whatever triggered the event
		setFormData({...formData, [name]: value})		// Update the current formData to include the new "name": value
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(formData, rememberCheck);
		navigate('/')

	}

	return (
		<Col md={{ span: 7, offset: 3 }}>
			<Row>
				<Logo message="Login to the React based Todo Task Manager!" />
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