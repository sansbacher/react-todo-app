import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'		// Now styled with React-Bootstrap Components
import './custom-styles-bs.css'

// For Dev: package.json has  "proxy": "https://sansbacher-task-manager.herokuapp.com/" set to proxy non-React routes (ie. API routes)
// to the production API endpoint (or could be a local one) to avoid CORS errors.

// For Production, hosting the website somewhere else:
// The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set this to the sub-directory.
// A properly formatted basename should have a leading slash, but no trailing slash.
// Will also need to set the  "homepage": "http://localhost:3000/API-React-Based" property in package.json, which will fix up the routing to match.
// With React Router 6, or at least how I have things set, there was no need to preference all routes with `${process.env.PUBLIC_URL}/`
// NOTE: if using client side routing, eg: /someItem/123 then will need to ensure web server serves the build/index.html for all 404's
// Or switch to HashRouter. See: https://create-react-app.dev/docs/deployment/
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename='/API-React-Based'>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
