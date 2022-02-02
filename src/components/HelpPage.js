import React from 'react'
import {Col, ListGroup, ListGroupItem} from 'react-bootstrap'

import Logo from './Logo'

const HelpPage = () => {
	return (
		<Col>
			<Logo />
			<div>
				<p>How to use this app:</p>
				<ListGroup numbered className="mb-2">
					<ListGroupItem as="li">Connect to the Internet, load this very page</ListGroupItem>
					<ListGroupItem as="li">Enter anything you need to do, literally anything.</ListGroupItem>
					<ListGroupItem as="li">When you've done that thing: check. it. off. (it's that simple)</ListGroupItem>
					<ListGroupItem as="li">You can click the Edit button to fix any mistakes in Todo items.</ListGroupItem>
					<ListGroupItem as="li">If you're tired of seeing all the things you've done: click Delete to remove the.</ListGroupItem>
					<ListGroupItem as="li">Give up? No problem, click Clear All and you'll have plenty of free time.</ListGroupItem>
				</ListGroup>
				<p>There's no editing of your Profile, but you can use the <a href="/profile.html" target="_blank" rel="noopener noreferrer">Vanilla JS version</a> of the Profile page.</p>
			</div>

		</Col>
	);
}

export default HelpPage;