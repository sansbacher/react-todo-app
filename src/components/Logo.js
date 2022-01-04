import React from 'react'
import {Image} from 'react-bootstrap'

const Strong = ({children}) => (			// The default
	<strong>{children}</strong>
)

const Italics = ({children}) => (			// Can be passed in as the Flair={Italics} prop - or some combination
	<em>{children}</em>
)

const Logo = ({ message = 'The React based Todo Task Manager!', Flair=Strong}) => {
	return (
		<>
			<div className="text-center">
				<Image className="pb-2" src="img/checklist-logo.png" alt="A checklist" />
				<p><Flair>{message}</Flair></p>
			</div>
		</>
	);
}

export {Logo as default, Italics, Strong}