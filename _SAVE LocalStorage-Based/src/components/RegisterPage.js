import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Logo from './Logo'

const RegisterPage = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({ name: '', email: '', password: '', age: ''})

	// Single event handler for any change to all "text" input fields
	const handleInputChange = (event) => {
		const { name, value } = event.target			// Destructure both the name="XXX" and value from whatever triggered the event
		setFormData({...formData, [name]: value})		// Update the current formData to include the new "name": value
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(formData);
		navigate('/')
	}

	return (
		<Col md={{ span: 7, offset: 3 }}>
			<Row>
				<Logo message="Login to the React based Todo Task Manager!" />
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