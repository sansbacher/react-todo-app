import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'

import AuthContext from '../context/auth-context'

const RequireAuth = ({children, login}) => {
	const {auth} = useContext(AuthContext)

	if (!auth.token) {
		return <Navigate to={login} />
	} else {
		return children;
	}
}

export default RequireAuth;