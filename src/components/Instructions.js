import React from 'react'
import {Image} from 'react-bootstrap'

const Instructions = () => {
	return (
		<div className="text-center">
			<Image className="pb-2" src="img/checklist-logo.png" alt="A checklist" />
			<p><strong>Enter anything you need to do, when you're done check it off!</strong></p>
		</div>
	);
}

export default Instructions;