import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import {Check2All} from 'react-bootstrap-icons'
import { getCookie, setCookie, apiFetch } from './utils/util'

import AuthContext from 'context/auth-context'
import AppRouter from 'routers/AppRouter'

function App() {
	const token = getCookie('task_manager_auth_token')
	const initialAuth = {}
	if (token !== '') {
		initialAuth.token = token
		initialAuth.user = {_cached: true}
	}
	const [auth, setAuth] = useState(initialAuth)		// Will have .token and .user properties
	const navigate = useNavigate()

	const handleLogout = () => {
		setCookie('task_manager_auth_token', 'deleted', -1)
		setAuth({})
		// The /users/logout endpoint returns no data, but log it if there's an issue - though we really don't care.
		apiFetch({method: 'POST', url: '/users/logout', token: auth.token, discard: true})
			.then(({success, response}) => {
				if (!success) {console.log('Error logging out!', response)}		// eslint-disable-line no-console
			})
		navigate('/login')
	}

	// Most of this is the same/static, and just the middle bit changes depending on the route
	return (
		<AuthContext.Provider value={{auth, setAuth}}>
			<Container>
				<Navbar bg="dark" variant="dark" sticky="top">
					<Container>
						<Navbar.Brand><Check2All size={24} /></Navbar.Brand>
						<Nav className="justify-content-end">
							{auth.token && <Nav.Item onClick={handleLogout} className="me-4 link-white p-0" as="a" href="#">LOGOUT</Nav.Item>}
							<Nav.Item><NavLink className="me-2 link-white" to="/">HOME</NavLink></Nav.Item>
							<Nav.Item><NavLink className="me-2 link-white" to="/help">HELP</NavLink></Nav.Item>
							<Nav.Item><NavLink className="link-white" to="/about">ABOUT</NavLink></Nav.Item>
						</Nav>
					</Container>
				</Navbar>
				<Row>
					<Col>
						<header className="p-5 mb-4 bg-light rounded-3 text-center">
							<h1>React Todo App</h1>
							<p><em>Manage all your have Todo!</em></p>
						</header>
					</Col>
				</Row>
				<Row className="pb-5">
					{/* Main application / content appears here, depending on the route */}
					<AppRouter />
				</Row>
				<Container className="footer">
					<Row>
						<Col>
							<div className='text-center bg-light footer-content'>
								<span>Source code on <a href="https://github.com/sansbacher/react-todo-app" target="_blank" rel="noreferrer">Github</a></span> 
								<br />
								<span>Made with React and React Bootstrap, but otherwise handmade - plus any other packages imported...</span>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</AuthContext.Provider>
	);
}

export default App;
