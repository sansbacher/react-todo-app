import React from 'react'
import {Col, Image} from 'react-bootstrap'

const AboutPage = () => {
	return (
		<Col>
			<div className="text-center">
				<Image className="pb-2" src="img/checklist-logo.png" alt="A checklist" />
				<p><strong>The React based Todo Task Manager!</strong></p>
			</div>
			<div>
				<p>
					This is a recreation of the Vanilla JS Task Manager front-end written in <a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>. It uses Create React App, and React-Bootstrap. Nothing fancy, but mainly just to test various React app components.
				</p>
				<p>
					The function and form is mostly identical to the <a href="https://github.com/sansbacher/todo-task-manager" target="_blank" rel="noreferrer">Vanilla Javascript versions</a>, but implemented in React. It should function the same since it targets the same Node/Express REST API back-end. However it will only implement the initial functions (not the Avatar or Sorting/Paging features).
				</p>
				<p>
					Initially it saved the data in the DOM, then LocalStorage, then routing was added, and Bootstrap, until it could call the API. The Git history should show these versions, but they're not separate.
				</p>
				<p>
					As before, the UI is nothing fancy - just Bootstrap from <a href="https://react-bootstrap.github.io/" target="_blank" rel="noreferrer">React Bootstrap</a>. The fancy web design can be left to those with artistic talents, this just needs to be function. So sorry if this page isn't very exciting.
				</p>

			</div>
		</Col>
	);
}

export default AboutPage;