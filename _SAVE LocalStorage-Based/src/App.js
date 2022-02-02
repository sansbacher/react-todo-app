import React from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'
import { Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import {Check2All} from 'react-bootstrap-icons'

import TodoApp from './components/TodoApp'
import AboutPage from './components/AboutPage'
import HelpPage from './components/HelpPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import NotFoundPage from './components/NotFoundPage'

function App() {
	return (
		<Container>
			<Navbar bg="dark" variant="dark" sticky="top">
				<Container>
					<Navbar.Brand><Check2All size={24} /></Navbar.Brand>
					<Nav className="justify-content-end">
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
				<Routes>
					<Route path="" element={<TodoApp />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="help" element={<HelpPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					
					<Route path="*" element={<NotFoundPage />} />

				</Routes>
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
	);
}

export default App;
