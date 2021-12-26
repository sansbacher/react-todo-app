import React from 'react'

const HelpPage = () => {
	return (
		<div>
			<div className="text-center">
				<img src="img/checklist-logo.png" alt="A checklist" />
				<p><strong>The React based Todo Task Manager!</strong></p>
			</div>
			<div>
				<p>How to use this app:</p>
				<ul className="decorated">
					<li>Connect to the Internet, load this very page</li>
					<li>Enter anything you need to do, literally anything.</li>
					<li>When you've done that thing: check. it. off. (it's that simple)</li>
					<li>You can click the Edit button to fix any mistakes in Todo items.</li>
					<li>If you're tired of seeing all the things you've done: click Delete to remove the.</li>
					<li>Give up? No problem, click Clear All and you'll have plenty of free time.</li>
				</ul>
				<p>A Helpful page to test routing with react.</p>
			</div>

		</div>
	);
}

export default HelpPage;