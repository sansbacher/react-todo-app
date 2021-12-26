import React from 'react'
import {Routes, Route, NavLink} from 'react-router-dom'

import TodoApp from './components/TodoApp'
import AboutPage from './components/AboutPage'
import HelpPage from './components/HelpPage'

function App() {
	
	return (
		<div className="medium-container">
			<nav>
				<span className="margin-right">LOGO</span>
				<NavLink className="margin-right" to="/">HOME</NavLink>
				<NavLink className="margin-right" to="/help">HELP</NavLink>
				<NavLink className="margin-right" to="/about">ABOUT</NavLink>
			</nav>
			<header>
				<h1>React Todo App</h1>
				<p><em>Manage all your have Todo!</em></p>
			</header>
			<Routes>
				<Route path="/" element={<TodoApp />} />
				<Route path="about" element={<AboutPage />} />
				<Route path="help" element={<HelpPage />} />
			</Routes>
			<footer>
				<p>Source code on Github</p>
			</footer>
		</div>
	);
}

export default App;
