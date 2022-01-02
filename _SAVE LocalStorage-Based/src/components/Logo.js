import React from 'react'
import {Image} from 'react-bootstrap'

const Logo = ({ message = 'The React based Todo Task Manager!' }) => {
	return (
		<>
			<div className="text-center">
				<Image className="pb-2" src="img/checklist-logo.png" alt="A checklist" />
				<p><strong>{message}</strong></p>
			</div>
		</>
	);
}

export default Logo;