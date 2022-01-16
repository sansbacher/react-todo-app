import React from 'react'
import {Routes, Route} from 'react-router-dom'

import RequireAuth from './RequireAuth'
import TodoApp from 'components/TodoApp'
import AboutPage from 'components/AboutPage'
import HelpPage from 'components/HelpPage'
import LoginPage from 'components/LoginPage'
import RegisterPage from 'components/RegisterPage'
import NotFoundPage from 'components/NotFoundPage'

// Note: <BrowserRouter> is in index.js, which has basename="/somePrefixPath" set
const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={
				<RequireAuth login="login">
					<TodoApp />
				</RequireAuth>
			} />
			<Route path="/about" element={<AboutPage />} />
			<Route path="/help" element={<HelpPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default AppRouter;

