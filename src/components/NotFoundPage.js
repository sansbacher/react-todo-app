import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Logo from './Logo'

const NotFoundPage = () => {
	return (
		<Col md={{span: 8, offset: 2}}>
			<Row>
				<Logo />
			</Row>
			<Row className="mt-4">
				<p>Page not found!</p>
				<Link to="/">Go to the home page</Link>
			</Row>
		</Col>
	);
}

export default NotFoundPage;