import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

// Initial plain/non-default/semi-decent dev styles:
import 'primitive-ui/dist/css/main.css'			// https://taniarascia.github.io/primitive/
//import './custom-styles.css'

//import 'bootstrap/dist/css/bootstrap.min.css';		// Now styled with React-Bootstrap Components

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
