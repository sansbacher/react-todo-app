import React from 'react'

// These will be replaced with their actual values once available
const initialValue = {
	auth: {},
	setAuth: () => {}
}

const AuthContext = React.createContext(initialValue)

export default AuthContext;