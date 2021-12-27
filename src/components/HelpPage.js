import React from 'react'
import {Col, Image, ListGroup, ListGroupItem} from 'react-bootstrap'

const HelpPage = () => {
	return (
		<Col>
			<div className="text-center">
				<Image className="pb-2" src="img/checklist-logo.png" alt="A checklist" />
				<p><strong>The React based Todo Task Manager!</strong></p>
			</div>
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
				<p>A Helpful page to test routing with react.</p>
			</div>

		</Col>
	);
}

export default HelpPage;