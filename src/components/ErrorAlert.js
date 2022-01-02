import React from 'react'


// For some reason, in my Chrome using the React Bootstrap <Alert> component would cause a: React instrumentation encountered an error: RangeError: Maximum call stack size exceeded
// in the Console. Similar to the modal issue. Using basically the exact same BS alert with class names was no problem.
const ErrorAlert = ({heading, message}) => {
	return (
		<div className="alert alert-danger text-small" role="alert">
			<h5 className="alert-heading">{heading}</h5>
			<hr className="mt-2" />
			<p className="mb-0">
				{message}
			</p>
		</div>
	);
}

export default ErrorAlert;